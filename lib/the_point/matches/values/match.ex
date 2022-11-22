defmodule ThePoint.Matches.Values.Match do
  @moduledoc false

  alias ThePoint.Composite.Value
  alias ThePoint.Matches.Match
  alias ThePoint.Matches.Values.Player
  alias ThePoint.Games.Values.Game

  def build(users) when is_list(users),
    do: Enum.map(users, &build/1)

  def build(%Match{} = match) do
    Value.init_with_map()
    |> Value.add(
      id: match.id,
      inserted_at: match.inserted_at,
      players: Player.build(match.players),
      game: Game.build(match.game)
    )
  end
end
