defmodule ThePoint.Users.User do
  @moduledoc false
  use Ecto.Schema
  use Pow.Ecto.Schema
  use PowAssent.Ecto.Schema

  import Ecto.Changeset

  alias ThePoint.Users.User
  alias ThePoint.Friendships.Friendship

  schema "users" do
    field :name, :string, redact: true
    field :username, :string, redact: true
    field :short_slug, :string, redact: true
    field :status, Ecto.Enum, values: [:initiated, :active, :deleted], default: :initiated

    pow_user_fields()

    many_to_many :friendships,
                 User,
                 join_through: Friendship,
                 join_keys: [requester_id: :id, addressee_id: :id]

    many_to_many :reverse_friendships,
                 User,
                 join_through: Friendship,
                 join_keys: [addressee_id: :id, requester_id: :id]

    timestamps()
  end

  @doc false
  def changeset(user, map) do
    user
    |> cast(map, [
      :name,
      :username,
      :email,
      :short_slug,
      :status,
      :password
    ])
    |> validate_required([:username, :name])
    |> unique_constraint(:username)
  end
end
