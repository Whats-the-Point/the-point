defmodule ThePoint.Repo do
  use Ecto.Repo,
    otp_app: :the_point,
    adapter: Ecto.Adapters.Postgres
end
