defmodule ThePointWeb.PageController do
  use ThePointWeb, :controller

  def index(conn, _params) do
    json(conn, :ok)
  end
end
