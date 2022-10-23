defmodule ThePoint.Repo.Migrations.CreateFriendshipTable do
  use Ecto.Migration

  def change do
    create table(:friendships) do
      add :status, :string
      add :addressee_id, references(:users)
      add :requester_id, references(:users)
      timestamps()
    end

    create index(:friendships, [:addressee_id])
    create index(:friendships, [:requester_id])

    create unique_index(
             :friendships,
             [:addressee_id, :requester_id],
             name: :friendships_addressee_id_requester_id_index
           )

    create unique_index(
             :friendships,
             [:requester_id, :addressee_id],
             name: :friendships_requester_id_addressee_id_index
           )
  end
end
