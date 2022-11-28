defmodule ThePoint.Games.Values.Game do
  @moduledoc false

  alias ThePoint.Composite.Value
  alias ThePoint.Games.Game

  def build(games) when is_list(games),
    do: Enum.map(games, &build/1)

  def build(%Game{} = game) do
    Value.init_with_map()
    |> Value.add(
      name: game.name,
      is_point_system: game.is_point_system,
      min_players: game.min_players,
      max_players: game.max_players,
      slug: game.slug
    )
  end
end
