defmodule ThePoint.Value.Friendship do
  @moduledoc false

  alias ThePoint.Composite.Value
  alias ThePoint.Friendships.Friendship
  alias ThePoint.Value.User

  def build(friendships) when is_list(friendships),
    do: Enum.map(friendships, &build/1)

  def build(%Friendship{} = friendship) do
    Value.init_with_map()
    |> Value.add(
      id: friendship.id,
      requester: User.build(friendship.requester),
      status: friendship.status
    )
  end
end
