defmodule ThePoint.Friendships.Friendship do
  @moduledoc false
  use Ecto.Schema

  import Ecto.Changeset

  schema "friendships" do
    field :status, Ecto.Enum,
      values: [:requested, :accepted, :blocked],
      default: :requested

    field :addressee_id, :id
    field :requester_id, :id
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
      :addressee_id,
      :requester_id,
      :status
    ])
    |> unique_constraint(
      [:addressee_id, :requester_id],
      name: :friendships_addressee_id_requester_id_index
    )
    |> unique_constraint(
      [:requester_id, :addresse_id],
      name: :friendships_addressee_id_requester_id_index
    )
  end
end
