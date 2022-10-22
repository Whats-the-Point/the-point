defmodule ThePoint.Users.User do
  @moduledoc false
  use Ecto.Schema
  use Pow.Ecto.Schema
  use PowAssent.Ecto.Schema

  import Pow.Ecto.Schema.Changeset,
  only: [new_password_changeset: 3]

  import Ecto.Changeset

  schema "users" do
    field :name, :string, redact: true
    field :username, :string, redact: true
    field :short_slug, :string, redact: true
    field :status, Ecto.Enum, values: [:initiated, :active, :deleted], default: :initiated

    pow_user_fields()

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
