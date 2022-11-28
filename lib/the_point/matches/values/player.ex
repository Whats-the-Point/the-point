defmodule ThePoint.Matches.Values.Player do
  @moduledoc false

  alias ThePoint.Composite.Value
  alias ThePoint.Matches.Player
  alias ThePoint.Users.Values.User

  def build(players) when is_list(players),
    do: Enum.map(players, &build/1)

  def build(%Player{} = player) do
    Value.init_with_map()
    |> Value.add(
      score: player.score,
      winner: player.winner,
      user: User.build(player.user)
    )
  end
end
