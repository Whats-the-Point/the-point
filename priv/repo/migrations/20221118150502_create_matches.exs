defmodule ThePoint.Repo.Migrations.CreateMatches do
  use Ecto.Migration

  def change do
    create table(:matches) do
      add :game_id, references(:games, on_delete: :nothing)

      timestamps()
    end

    create index(:matches, [:game_id])
  end
end
