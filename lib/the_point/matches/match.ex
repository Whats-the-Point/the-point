defmodule ThePoint.Matches.Match do
  use Ecto.Schema
  import Ecto.Changeset

  alias ThePoint.Games.Game
  alias ThePoint.Matches.Player

  schema "matches" do
    belongs_to :game, Game
    has_many :players, Player

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [
      :game_id
    ])
    |> validate_required([:game_id])
    |> Ecto.Changeset.cast_assoc(:players, with: &Player.changeset/2)
  end
end
