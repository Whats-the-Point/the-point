defmodule ThePointWeb.APIAuthErrorHandler do
  @moduledoc false
  use ThePointWeb, :controller
  alias Plug.Conn

  @spec call(Conn.t(), :not_authenticated) :: Conn.t()
  def call(conn, :not_authenticated) do
    conn
    |> put_status(403)
    |> json(%{error: %{code: 403, message: "Not authenticated"}})
  end
end
