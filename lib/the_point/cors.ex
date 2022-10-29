defmodule ThePoint.CORS do
  @moduledoc """
  Module needed for runtime configuration of cors_plug.

  Currently cors_plug does not support configuring it in
  config/releases.exs because of the way the cors_plug application is
  initialize.

  Check: https://github.com/mschae/cors_plug/issues/69#issuecomment-517695590

  As such, the workaround for now is to use a function for configuration
  so we can successfully configure it at runtime.
  """

  @allowed_headers [
    "Authorization",
    "Content-Type",
    "Accept",
    "Origin",
    "User-Agent",
    "DNT",
    "Cache-Control",
    "X-Mx-ReqToken",
    "Keep-Alive",
    "X-Requested-With",
    "If-Modified-Since",
    "X-CSRF-Token",
    "x-datadog-origin",
    "x-datadog-parent-id",
    "x-datadog-sampled",
    "x-datadog-sampling-priority",
    "x-datadog-trace-id",
    "X-Remote-CDN-Pass",
    "ThePoint-Version",
    "Referer",
    "Referrer-Policy"
  ]

  def allowed_origin(conn) do
    Map.get(conn.private, :cors_allowed_origin, Application.get_env(:the_point, :cors_allowed_origin))
    |> IO.inspect()
  end

  def allowed_headers, do: @allowed_headers
end
