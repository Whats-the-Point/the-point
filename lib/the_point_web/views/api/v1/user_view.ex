defmodule ThePointWeb.API.V1.UserView do
  use ThePointWeb, :view

  def render("success.json", %{user: user}) do
    %{
      short_slug: user.short_slug,
      name: user.name,
      username: user.username,
      status: user.status,
      email: user.email
    }
  end
end
