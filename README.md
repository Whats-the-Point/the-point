# ThePoint

## Requirements

You need the following to run tiger:

- erlang
- elixir
- postgres

### Installing natively (via asdf)

With [asdf](https://github.com/asdf-vm/asdf) you can just run `asdf install` and it should install the plugins and the correct versions of elixir, erlang, postgres and redis (see `.tool-versions`). Most likely you will need some extra options for postgres so `POSTGRES_EXTRA_CONFIGURE_OPTIONS=--with-uuid=e2fs asdf install` is recommended.

#### Notes for upgrading erlang/elixir

If you're running the tiger app locally and receive a message about missing erlang or elixir version,
just install the suggested version.
For new versions of MacOS and asdf everything should go flawlessly.

If you experience any issues during compilation or see a lot of warning from libraries that should be already deleted, try cleaning dependencies and compiled files first:

```
mix deps.clean --all
rm -rf _build/*
```
##### Running

If running `postgres`/`pg_ctl start` or `brew services start postgresql` (if installed via brew) does not work try the following command:

`pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start`

Don't forget to run setup as a first time user:

##### Postgres Setup

For postgres, also make sure to follow the [postgres setup instructions](https://github.com/smashedtoatoms/asdf-postgres#run) (specifically creating a DB), basically:

1. Start postgres (see previous section)
2. `createdb <username>` (leaving `<username>` empty should pick up your current username)


##### Troubleshooting

If running `mix ecto.reset` raises an role issue run: `psql -c "CREATE USER postgres SUPERUSER;"`

If encounter issue where `uuid-ossp` cannot be found when running `mix ecto.reset` with Postgres installed by `asdf`:

1. uninstall current Postgres
   `asdf uninstall postgres 13.7`
2. install with following command
   `POSTGRES_EXTRA_CONFIGURE_OPTIONS=--with-uuid=e2fs asdf install postgres 13.7`
3. setup Postgres again

If Postgres installed by `asdf` and you're having troubles to run it, [this](https://github.com/smashedtoatoms/asdf-postgres#run) may help.

If Postgres is missing `postgres` role:

```
FATAL:  role "postgres" does not exist
```

Execute the following command and restart the server:

```
createuser postgres -s
```

## Running The Point API

To start your Phoenix server:

- Get secrets ready `touch .env.dev`
- Grab `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values from Google OATH. You should only have to do this once. And add them to your local `.env.dev`.
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).
