defmodule ThePointWeb.API.V1.MatchView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response
  alias ThePoint.Matches.Values.Match

  def render("index.json", %{matches: matches}) do
    matches
    |> Match.build()
    |> then(&Response.init(%{matches: &1}))
  end

  def render("success.json", _) do
    Response.init(%{status: :ok})
  end
end
