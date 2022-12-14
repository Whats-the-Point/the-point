defmodule ThePointWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :the_point

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_the_point_key",
    signing_salt: "cX3tuTaI"
  ]

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.Static,
    at: "/",
    from: :the_point,
    gzip: false,
    only: ~w(assets fonts images webapp favicon.ico robots.txt)

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug ThePoint.Plugs.Parsers,
    parsers: [:multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library(),
    length: 20_000_000

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug Pow.Plug.Session, otp_app: :the_point

  plug(CORSPlug, origin: &ThePoint.CORS.allowed_origin/1, headers: ThePoint.CORS.allowed_headers())

  plug ThePointWeb.Router
end
