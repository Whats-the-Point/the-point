defmodule ThePointWeb.API.V1.AuthorizationController do
  use ThePointWeb, :controller

  alias Plug.Conn
  alias PowAssent.Plug

  @spec new(Conn.t(), map()) :: Conn.t()
  def new(conn, %{"provider" => provider}) do
    with {:ok, url, conn} <- Plug.authorize_url(conn, provider, redirect_uri(conn)) do
        json(conn, %{data: %{url: url, session_params: conn.private[:pow_assent_session_params]}})
    else
      {:error, _error, conn} ->
        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: "An unexpected error occurred"}})

      something ->
        IO.inspect(something)
        json(conn, :ok)
    end
  end

  defp redirect_uri(conn) do
    Application.get_env(:the_point, :oauth_redirect_link) <> "#{conn.params["provider"]}/callback"
  end

  @spec callback(Conn.t(), map()) :: Conn.t()
  def callback(conn, %{"provider" => provider} = params) do
    session_params = Map.fetch!(params, "session_params")
    params         = Map.drop(params, ["provider", "session_params"])

    conn
    |> Conn.put_private(:pow_assent_session_params, session_params)
    |> Plug.callback_upsert(provider, params, redirect_uri(conn))
    |> case do
      {:ok, conn} ->
        json(conn, %{data: %{access_token: conn.private.api_access_token, renewal_token: conn.private.api_renewal_token}})

      {:error, conn} ->
        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: "An unexpected error occurred"}})
    end
  end
end
