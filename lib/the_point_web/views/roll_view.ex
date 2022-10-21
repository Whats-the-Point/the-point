defmodule ThePointWeb.RollView do
  use ThePointWeb, :view

  def render("index.json", _data) do
    %{status: "ok", roll: 4}
  end
end
