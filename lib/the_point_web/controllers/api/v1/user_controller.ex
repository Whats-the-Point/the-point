defmodule ThePointWeb.API.V1.UserController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Users.Handler.User

  action_fallback(ThePointWeb.API.V1.FallbackController)

  plug :reload_user

  @doc """
  Get current user profile info

  ## Request:

  `GET /api/v1/user`

  Response 200:

    {
      "email": "email@email.com",
      "name": "John Doe",
      "short_slug": "MLIN4H",
      "status": "active",
      "username": "john_doe"
    }

  """
  def show(conn, _, current_user) do
    render(conn, "show.json", %{user: current_user})
  end

  @doc """
  Completes fields for user after successfull register

  ## Request:

  `POST /api/v1/user/complete_profile`

  Params:
    * username
    * name

  Response 200:

  {
    "data": {
        "status": "ok"
    }
  }

  """
  def complete_profile(conn, params, current_user) do
    with {:ok, _user} <- User.complete_profile(current_user, params) do
      render(conn, "success.json")
    end
  end

  defp reload_user(conn, _opts) do
    config = Pow.Plug.fetch_config(conn)
    user = Pow.Plug.current_user(conn, config)
    reloaded_user = ThePoint.Repo.get!(ThePoint.Users.User, user.id)

    Pow.Plug.assign_current_user(conn, reloaded_user, config)
  end
end
