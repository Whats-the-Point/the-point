defmodule ThePoint.Repo.Migrations.CreateGamesTable do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :name, :string
      add :is_point_system, :boolean
      add :min_players, :integer
      add :max_players, :integer
    end
  end
end
