defmodule ThePoint.Repo.Migrations.AddUserInfo do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: true
      add :username, :string, null: true
      add :short_slug, :string
      add :status, :string
    end

    create unique_index(:users, [:username])
  end
end
