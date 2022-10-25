defmodule ThePoint.Users.User do
  @moduledoc false
  use Ecto.Schema
  use Pow.Ecto.Schema
  use PowAssent.Ecto.Schema

  import Ecto.Changeset
  import ThePoint.Changeset

  alias ThePoint.Friendships.Friendship

  schema "users" do
    field :name, :string, redact: true
    field :username, :string, redact: true
    field :short_slug, :string, redact: true
    field :status, Ecto.Enum, values: [:initiated, :active, :deleted], default: :initiated

    pow_user_fields()

    has_many :friendships, Friendship, foreign_key: :requester_id
    has_many :reverse_friendships, Friendship, foreign_key: :addressee_id

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
    |> trim([:name, :username])
    |> validate_required([:username, :name])
    |> unique_constraint(:username)
    |> validate_length(:name, count: :codepoints, max: 255)
    |> validate_length(:username, count: :codepoints, min: 8, max: 20)
    |> validate_username()
  end

  @doc """
  1. Only contains alphanumeric characters, underscore and dot.
  2. Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
  3. Underscore and dot can't be next to each other (e.g user_.name).
  4. Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
  5. Number of characters must be between 8 to 20.
  """
  def validate_username(%{valid?: true} = changeset) do
    if String.match?(get_field(changeset, :username), ~r/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/i) do
      changeset
    else
      add_error(changeset, :username, "not valid. please respect the rules")
    end
  end

  def validate_username(changeset), do: changeset
end
