defmodule ThePointWeb.Router do
  use ThePointWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ThePointWeb do
    pipe_through :api

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", ThePointWeb do
    pipe_through :api

    get "/roll", RollController, :index
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
