defmodule ThePoint.Games.Games do
  @moduledoc """
  The Games context
  """

  import Ecto.Query

  alias ThePoint.Repo
  alias ThePoint.Games.Game

  @doc """
  Returns the list of games.

  ## Examples

      iex> list_games()
      [%Game{}, ...]

  """
  def list_games do
    Repo.all(Game)
  end

  def get_game(id), do: Repo.get(Game, id)

  def get_game_by_slug(slug), do: Repo.get_by(Game, %{slug: slug})

  @doc """
  Creates a Game.

  ## Examples

      iex> create_game(%{field: new_value})
      {:ok, %Game{}}

      iex> create_game(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_game(attrs \\ %{}) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a Game.

  ## Examples

      iex> update_game(game, %{field: new_value})
      {:ok, %Game{}}

      iex> update_game(game, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_game(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update()
  end

  def get_games_by_name(name) do
    query =
      from(game in Game,
        where: ilike(game.name, ^"%#{name}%")
      )

    Repo.all(query)
  end
end
