defmodule ThePoint.Repo.Migrations.AddUserInfo do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :first_name, :string, null: true
      add :last_name, :string, null: true
      add :username, :string, null: true
      add :short_slug, :string
      add :status, :string
    end

    create unique_index(:users, [:username])
  end
end
