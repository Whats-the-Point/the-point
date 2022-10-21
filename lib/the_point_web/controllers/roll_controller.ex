defmodule ThePointWeb.RollController do
  use ThePointWeb, :controller

  def index(conn, _params) do
    render(conn, "index.json")
  end
end
