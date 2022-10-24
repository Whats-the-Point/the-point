defmodule ThePoint.Games.Game do
  @moduledoc false
  use Ecto.Schema

  import Ecto.Changeset
  import ThePoint.Changeset

  schema "games" do
    field :name, :string
    field :is_point_system, :boolean
    field :min_players, :integer
    field :max_players, :integer
    field :slug, Ecto.UUID, autogenerate: true

    timestamps()
  end

  @doc false
  def changeset(user, map) do
    user
    |> cast(map, [
      :name,
      :is_point_system,
      :min_players,
      :max_players
    ])
    |> trim([:name])
    |> validate_required([:name, :is_point_system, :min_players, :max_players])
    |> validate_length(:name, count: :codepoints, max: 255)
  end
end
