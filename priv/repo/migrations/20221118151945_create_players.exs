defmodule ThePoint.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :score, :integer
      add :winner, :boolean
      add :match_id, references(:matches, on_delete: :nothing, null: false)
      add :user_id, references(:users, on_delete: :nothing, null: false)

      timestamps()
    end

    create unique_index(
      :players,
      [:user_id, :match_id],
      name: :players_user_id_match_id_index
    )
  end
end
