defmodule ThePointWeb.API.V1.GameController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Games.Games

  action_fallback(ThePointWeb.API.V1.FallbackController)

  @doc """
  Gets the list of games

  ## Request:

  `GET /api/v1/games`

  Response 200:
  {
    "data": {
    }
  }
  """
  def index(conn, _, _current_user) do
    games = Games.list_games()
    render(conn, "index.json", %{games: games})
  end

  def search(conn, %{"name" => name}, _current_user) do
    games = Games.get_games_by_name(name)
    render(conn, "index.json", %{games: games})
  end
end
