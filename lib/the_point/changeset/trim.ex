defmodule ThePoint.Changeset.Trim do
  defmodule UntrimmableFieldError do
    @moduledoc """
    For raising when a developer has passed in an errant non-:string field_name.
    """
    use ThePoint.Errors.Error, custom_fields: [:field_name]
  end

  @moduledoc false

  import Ecto.Changeset

  @spec call(Ecto.Changeset.t(), nonempty_list(atom())) :: Ecto.Changeset.t()
  def call(changeset = %Ecto.Changeset{}, field_names) when is_list(field_names) do
    Enum.reduce(field_names, changeset, fn field_name, acc ->
      call(acc, field_name)
    end)
  end

  @spec call(Ecto.Changeset.t(), atom()) :: Ecto.Changeset.t()
  def call(changeset = %Ecto.Changeset{}, field_name) when is_atom(field_name) do
    case get_change(changeset, field_name) do
      value when is_binary(value) ->
        put_change(changeset, field_name, String.trim(value))

      nil ->
        changeset

      _ ->
        raise UntrimmableFieldError,
          message: "Invalid field_name passed to trim. Must be a :string type.",
          field_name: field_name
    end
  end
end
