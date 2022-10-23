defmodule ThePointWeb.API.V1.FriendshipView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response
  alias ThePoint.Users.Values.User
  alias ThePoint.Friendships.Values.Friendship

  def render("index.json", %{friends: friends}) do
    friends
    |> User.build()
    |> then(&Response.init(%{friends: &1}))
  end

  def render("index.json", %{blocked_users: blocked_users}) do
    blocked_users
    |> User.build()
    |> then(&Response.init(%{blocked_users: &1}))
  end

  def render("list_pending.json", %{friendships: friendships}) do
    friendships
    |> Friendship.build()
    |> then(&Response.init(%{friendships: &1}))
  end

  def render("success.json", _) do
    Response.init(%{status: :ok})
  end
end
