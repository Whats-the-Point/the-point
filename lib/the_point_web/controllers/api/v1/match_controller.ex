defmodule ThePointWeb.API.V1.MatchController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Matches.Handler.Match

  action_fallback(ThePointWeb.API.V1.FallbackController)

  def index(conn, _, current_user) do
    user_matches = Match.get_user_matches(current_user)
    render(conn, "index.json", %{matches: user_matches})
  end

  @doc """

  ## Request:

  `POST /api/v1/match/create`

  Params:

  Response 200:
  {
    "data": {
    }
  }
  """
  def create(conn, params, current_user) do
    with {:ok, _match} <- Match.create(current_user, params) do
      render(conn, "success.json")
    end
  end
end
