defmodule ThePoint.Repo.Migrations.AddShortSlugUniqueIndex do
  use Ecto.Migration

  @disable_ddl_transaction true
  @disable_migration_lock true

  def up do
    create unique_index(
             :users,
             [:short_slug],
             name: :unique_users_short_slug,
             where: "short_slug is not null",
             concurrently: true
           )
  end

  def down do
    drop index(:users, [:short_slug], name: :unique_users_short_slug, concurrently: true)
  end
end
