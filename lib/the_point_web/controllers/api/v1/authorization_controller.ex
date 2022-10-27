defmodule ThePointWeb.API.V1.AuthorizationController do
  use ThePointWeb, :controller

  alias Plug.Conn
  alias PowAssent.Plug

  action_fallback(ThePointWeb.API.V1.FallbackController)

  @spec new(Conn.t(), map()) :: Conn.t()
  def new(conn, %{"provider" => provider}) do
    conn
    |> Plug.authorize_url(provider, redirect_uri(conn))
    |> case do
      {:ok, url, conn} ->
        json(conn, %{data: %{url: url, session_params: conn.private[:pow_assent_session_params]}})

      {:error, _error, conn} ->
        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: "An unexpected error occurred"}})
    end
  end

  defp redirect_uri(_conn) do
    Application.get_env(:the_point, :client_link) <> "login/callback"
  end

  @spec callback(Conn.t(), map()) :: Conn.t()
  def callback(conn, %{"provider" => provider} = params) do
    with {:ok, session_params} <- Map.fetch(params, "session_params") do
      params = Map.drop(params, ["provider", "session_params"])

      conn
      |> Conn.put_private(:pow_assent_session_params, session_params)
      |> Plug.callback_upsert(provider, params, redirect_uri(conn))
      |> case do
        {:ok, conn} ->
          json(conn, %{
            data: %{
              access_token: conn.private.api_access_token,
              renewal_token: conn.private.api_renewal_token,
              user_status: conn.assigns.current_user.status
            }
          })

        {:error, conn} ->
          conn
          |> put_status(500)
          |> json(%{error: %{status: 500, message: "An unexpected error occurred"}})
      end
    else
      :error ->
        {:error, {:bad_request, "Missing session params"}}
    end
  end
end
