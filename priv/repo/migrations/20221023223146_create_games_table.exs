defmodule ThePoint.Repo.Migrations.CreateGamesTable do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

    create table(:games) do
      add :name, :string
      add :is_point_system, :boolean
      add :min_players, :integer
      add :max_players, :integer
      add :slug, :uuid, default: fragment("uuid_generate_v4()"), null: false
    end
  end
end
