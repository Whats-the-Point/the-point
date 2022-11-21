defmodule ThePointWeb.API.V1.GameView do
  use ThePointWeb, :view

  alias ThePoint.Value.Response
  alias ThePoint.Games.Values.Game

  def render("index.json", %{games: games}) do
    games
    |> Game.build()
    |> then(&Response.init(%{games: &1}))
  end
end
