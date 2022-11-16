defmodule ThePointWeb.API.V1.UserView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response

  def render("show.json", %{user: user}) do
    %{
      short_slug: user.short_slug,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      email: user.email
    }
  end

  def render("success.json", _) do
    Response.init(%{status: :ok})
  end
end
