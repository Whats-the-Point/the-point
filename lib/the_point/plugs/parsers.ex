defmodule ThePoint.Plugs.Parsers do
  @moduledoc """
  This Plug module wraps the Plug.Parsers Plug so that
  we can capture the error raised by Plug.Parsers when parsing
  a request bigger than allowed, add the CORS headers, and
  only then return the 413 Payload Too Large request with the CORS errors.
  """
  use Plug.ErrorHandler

  alias Plug.Parsers

  @behaviour Plug

  @impl Plug
  def init(opts), do: Parsers.init(opts)

  @impl Plug
  def call(conn, opts), do: Parsers.call(conn, opts)

  # we noted that a Plug.Parsers error wasn't setting the CORS headers
  # since the Plug.Parsers immediately raises an error, hence we're manually
  # handling the error manually and setting the CORS headers even if an error happens
  @impl Plug.ErrorHandler
  def handle_errors(%{status: 413} = conn, _error_context) do
    conn
    |> set_cors_headers()
    |> Plug.Conn.send_resp(413, Jason.encode!(%{message: "Payload Too Large"}))
  end

  def handle_errors(conn, _error_context), do: conn

  defp set_cors_headers(conn) do
    opts = CORSPlug.init(origin: &ThePoint.CORS.allowed_origin/1, headers: ThePoint.CORS.allowed_headers())

    CORSPlug.call(conn, opts)
  end
end
