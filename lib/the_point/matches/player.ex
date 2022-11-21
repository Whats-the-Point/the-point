defmodule ThePoint.Matches.Player do
  use Ecto.Schema
  import Ecto.Changeset

  alias ThePoint.Users.User
  alias ThePoint.Matches.Match

  schema "players" do
    field :score, :integer
    field :winner, :boolean
    belongs_to :user, User
    belongs_to :match, Match

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:user_id, :match_id, :winner, :score])
    |> validate_required([:user_id, :winner])
    |> unique_constraint(
      [:user_id, :match_id],
      name: :players_user_id_match_id_index
    )
  end
end
