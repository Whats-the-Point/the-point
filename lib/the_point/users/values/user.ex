defmodule ThePoint.Users.Values.User do
  @moduledoc false

  alias ThePoint.Composite.Value
  alias ThePoint.Users.User

  def build(users) when is_list(users),
    do: Enum.map(users, &build/1)

  def build(%User{} = user) do
    Value.init_with_map()
    |> Value.add(
      short_slug: user.short_slug,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      email: user.email
    )
  end
end
