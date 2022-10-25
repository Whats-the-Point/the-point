defmodule ThePoint.Changeset do
  @moduledoc """
  Collection of useful, generic changeset-related functions
  """

  @doc """
  Ensures any changes to binary field_names are trimmed
  """
  @spec trim(Ecto.Changeset.t(), nonempty_list(atom()) | atom()) :: Ecto.Changeset.t()
  defdelegate trim(changeset, field_names), to: ThePoint.Changeset.Trim, as: :call

  def validate_at_least_one_required(changeset, fields) do
    if Enum.any?(fields, &present?(changeset, &1)) do
      changeset
    else
      Ecto.Changeset.add_error(
        changeset,
        hd(fields),
        "One of these fields must be present: #{inspect(fields)}"
      )
    end
  end

  defp present?(changeset, field) do
    value = Ecto.Changeset.get_field(changeset, field)
    value && value != ""
  end
end
