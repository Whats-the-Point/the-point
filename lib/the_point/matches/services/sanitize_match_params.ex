defmodule ThePoint.Matches.Services.SanitizeMatchParams do
  @moduledoc """
  This module sanitize params
  """

  alias ThePoint.Service.SanitizeParams
  alias ThePoint.Games.Games
  alias ThePoint.Users.Users

  @required_player_fields [
    "user_short_slug",
    "winner"
  ]

  @required_match_fields [
    "game_slug",
    "players"
  ]

  def call(params) do
    with {:ok, params} <- ensure_required_params(params, @required_match_fields),
         params <- SanitizeParams.call(params, @required_match_fields),
         {params, game} <- translate_game_slug(params),
         {:ok, players} <- allowed_number_of_players(params.players, game.max_players, game.min_players),
         attrs <-
           Map.replace(
             params,
             :players,
             sanitize_players_with_required_fields(players, game.is_point_system)
           ) do
      {:ok, attrs}
    end
  end

  defp sanitize_players_with_required_fields(players, true),
    do: sanitize_players(players, @required_player_fields ++ ["score"])

  defp sanitize_players_with_required_fields(players, false),
    do: sanitize_players(players, @required_player_fields)

  defp sanitize_players(players, fields) do
    Enum.map(players, fn player ->
      with {:ok, player_params} <- ensure_required_params(player, fields),
           params <- SanitizeParams.call(player_params, fields) do
        translate_user_short_slug(params)
      end
    end)
  end

  defp ensure_required_params(params, required_params) do
    params_keys = Map.keys(params)

    case Enum.all?(required_params, fn required_param -> required_param in params_keys end) do
      true -> {:ok, params}
      _ -> {:error, {:missing_required_params, Enum.join(required_params -- params_keys, ", ")}}
    end
  end

  defp translate_user_short_slug(attrs) do
    {slug, attrs} = Map.pop(attrs, :user_short_slug)
    user = Users.get_user_by_short_slug(slug)

    Map.put(attrs, :user_id, user.id)
  end

  defp translate_game_slug(attrs) do
    {slug, attrs} = Map.pop(attrs, :game_slug)
    game = Games.get_game_by_slug(slug)

    {Map.put(attrs, :game_id, game.id), game}
  end

  defp allowed_number_of_players(players, max_players, min_players)
       when length(players) <= max_players and length(players) >= min_players,
       do: {:ok, players}

  defp allowed_number_of_players(_players, _max_players, _min_players),
    do: {:error, 422, "Number of players not within limits of selected game."}
end
