defmodule ThePointWeb.Router do
  use ThePointWeb, :router
  use Pow.Phoenix.Router

  pipeline :api do
    plug :accepts, ["json"]
    plug ThePointWeb.APIAuthPlug, otp_app: :the_point
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: ThePointWeb.APIAuthErrorHandler
  end

  scope "/", ThePointWeb do
    pipe_through :api

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", ThePointWeb.API.V1, as: :api_v1 do
    pipe_through :api

    # resources "/registration", RegistrationController, singleton: true, only: [:create]
    # resources "/session", SessionController, singleton: true, only: [:create, :delete]

    resources "/session", SessionController, singleton: true, only: [:delete]
    post "/session/renew", SessionController, :renew

    get "/auth/:provider/new", AuthorizationController, :new
    post "/auth/:provider/callback", AuthorizationController, :callback
  end

  scope "/api/v1", ThePointWeb.API.V1, as: :api_v1 do
    pipe_through [:api, :api_protected]

    # protected API endpoints here
    get "/user", UserController, :show
    post "/user/complete-profile", UserController, :complete_profile

    scope("/friendship") do
      get "/", FriendshipController, :index
      get "/blocked", FriendshipController, :blocked_users
      get "/pending", FriendshipController, :list_pending
      post "/create", FriendshipController, :create
      post "/change-status", FriendshipController, :change_status
      delete "/delete/:friendship_id", FriendshipController, :delete
    end
  end

  if Mix.env() == :dev do
    pipeline :browser do
      plug :accepts, ["html"]
      plug :fetch_session
      plug :put_root_layout, {ThePointWeb.LayoutView, :root}
      plug :protect_from_forgery

      plug :put_secure_browser_headers, %{
        "Content-Security-Policy" =>
          "default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; img-src 'self' data: employ-production-assets.s3.amazonaws.com"
      }
    end
  end
end
