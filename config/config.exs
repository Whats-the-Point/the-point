# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :the_point,
  ecto_repos: [ThePoint.Repo],
  oauth_redirect_link: System.get_env("REDIRECT_URL") || "http://localhost:4000/api/v1/auth/"

# Configures the endpoint
config :the_point, ThePointWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: ThePointWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ThePoint.PubSub,
  live_view: [signing_salt: "qSXXnO/4"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :the_point, ThePoint.Mailer, adapter: Swoosh.Adapters.Local

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :the_point, :pow,
  user: ThePoint.Users.User,
  repo: ThePoint.Repo

config :the_point, :pow_assent,
  providers: [
    google: [
      client_id: System.get_env("GOOGLE_CLIENT_ID"),
      client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
      strategy: Assent.Strategy.Google
    ]
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
