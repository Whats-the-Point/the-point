defmodule ThePoint.Services.SetShortSlug do
  @moduledoc """
  Sets an unique short slug on the struct. This can be used by external systems that require smaller
  and more stricter unique identifiers.
  """

  @max_retries 10

  require Logger

  import Ecto.Changeset

  alias ThePoint.Repo
  alias ThePoint.Services.GenerateRandomString
  alias ThePoint.Users.User

  @doc """
  Updates the struct with a unique short slug if there is none, using provided changeset function.

  Retries up to 10 times in case of conflicts.
  """

  def call(struct, get_new_short_slug \\ &get_random_short_slug/0)

  def call(%{short_slug: short_slug} = struct, _get_new_short_slug)
      when is_binary(short_slug) and byte_size(short_slug) > 0 do
    {:ok, struct}
  end

  def call(%{short_slug: _} = struct, get_new_short_slug) do
    unique_index_name = get_unique_index_name(struct)
    retry_new_short_slug(struct, 0, unique_index_name, get_new_short_slug)
  end

  defp retry_new_short_slug(struct, @max_retries, _unique_index_name, _get_new_short_slug) do
    Logger.error("Failed to generate unique slug after #{@max_retries} attemps")
    {:ok, struct}
  end

  defp retry_new_short_slug(struct, num_retries, unique_index_name, get_new_short_slug) do
    short_slug = get_new_short_slug.()
    changeset = build_changeset(struct, short_slug, unique_index_name)

    # Investigation for https://gitlab.com/remote-com/employ-starbase/tracker/-/issues/12062
    try do
      case Repo.update(changeset) do
        {:ok, struct} ->
          {:ok, struct}

        {:error, _} ->
          retry_new_short_slug(struct, num_retries + 1, unique_index_name, get_new_short_slug)
      end
    rescue
      exception in Postgrex.Error ->
        changeset
        |> Map.from_struct()
        |> Map.take([:changes, :constraints])

        exception
    end
  end

  def get_random_short_slug do
    GenerateRandomString.call(1, [:uppercase_letters]) <>
      GenerateRandomString.call(5, [:numbers, :uppercase_letters])
  end

  defp build_changeset(struct, short_slug, unique_index_name) do
    struct
    |> cast(%{short_slug: short_slug}, [:short_slug])
    |> validate_required([:short_slug])
    |> validate_length(:short_slug, is: 6)
    |> validate_format(:short_slug, ~r/^[0-9A-Z]{6}$/)
    |> unique_constraint(:short_slug, name: unique_index_name)
  end

  defp get_unique_index_name(struct) do
    case struct do
      %User{} -> :unique_users_short_slug
    end
  end
end
