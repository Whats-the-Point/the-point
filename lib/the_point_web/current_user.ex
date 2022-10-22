defmodule ThePointWeb.CurrentUser do
  @moduledoc """
  Helper module to inject the current user, using `Pow.Plug.current_user/1` as
  the last argument in a controller's actions.

  If a user session exists the last argument will be a `%ThePoint.Accounts.User{}`
  struct, otherwise it'll be set to `:anonymous`.

  ## Usage

  ```elixir
  defmodule Controller do
    use ThePointWeb, :controller
    use ThePointWeb.CurrentUser

    def index(conn, params, current_user) do
      # You can now use the `current_user` argument to access the logged in
      # user's attributes.
      ...
    end

    ...
  end
  ```

  ## Options

  If you wish to only inject the user in some of the actions you can leverage the `:actions` option to specify which
  actions should have the user argument injected, like shown:

  ```elixir
  defmodule Controller do
    use ThePointWeb, :controller
    use ThePointWeb.CurrentUser, actions: [:show]

    def index(conn, params) do
      # The logged in user is not accessible in this action as this action name
      # is not present in the `:actions` option.
      ...
    end

    def show(conn, params, current_user) do
      # Since `:show` is provided in the list of actions, in the `:actions`
      # opts, the user is injected as an argument for this action.
      ...
    end
  end
  ```
  """

  defmacro __using__(opts) do
    actions = Keyword.get(opts, :actions)

    quote location: :keep do
      def action(conn, _opts) do
        current_user = Pow.Plug.current_user(conn) || :anonymous

        cond do
          # :actions option is not specified so every action will have the
          # current user injected.
          is_nil(unquote(actions)) ->
            apply(__MODULE__, action_name(conn), [conn, conn.params, current_user])

          # :actions option was provided and the current action is in the list
          # of actions so the current user will be injected.
          action_name(conn) in unquote(actions) ->
            apply(__MODULE__, action_name(conn), [conn, conn.params, current_user])

          # :actions option was provided but the current action is not in the
          # list of actions so the current user will not be injected.
          true ->
            apply(__MODULE__, action_name(conn), [conn, conn.params])
        end
      end
    end
  end
end
