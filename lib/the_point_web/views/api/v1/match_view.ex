defmodule ThePointWeb.API.V1.MatchView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response

  def render("success.json", _) do
    Response.init(%{status: :ok})
  end
end
