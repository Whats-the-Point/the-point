defmodule ThePointWeb.API.V1.UserController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Handler.User

  plug :reload_user

  @doc """
  Completes fields for user after successfull register

  ## Request:

  `POST /api/v1/user/complete_profile`

  Params:
    * username
    * name

  Response 200:

    {
      "email": "email@email.com",
      "name": "John Doe",
      "short_slug": "MLIN4H",
      "status": "active",
      "username": "john_doe"
    }

  """
  def complete_profile(conn, params, current_user) do
    current_user
    |> User.complete_profile(params)
    |> case do
      {:ok, user} ->
        render(conn, "success.json", %{user: user})

      {:error, reason} ->
        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: reason}})
    end
  end



  defp reload_user(conn, _opts) do
    config        = Pow.Plug.fetch_config(conn)
    user          = Pow.Plug.current_user(conn, config)
    reloaded_user = ThePoint.Repo.get!(ThePoint.Users.User, user.id)

    Pow.Plug.assign_current_user(conn, reloaded_user, config)
  end
end
