defmodule ThePointWeb.API.V1.FriendshipView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response
  alias ThePoint.Value.User

  def render("index.json", %{friends: friends}) do
    friends
    |> Enum.map(&User.build(&1))
    |> then(&Response.init(%{friends: &1}))
  end

  def render("success.json", _) do
    Response.init(%{status: :ok})
  end
end
