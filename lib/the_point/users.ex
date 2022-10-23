defmodule ThePoint.Users do
  @moduledoc """
  The Users context
  """
  import Ecto.Query

  alias ThePoint.Repo
  alias ThePoint.Users.User
  alias ThePoint.Friendships.Friendship

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  def list_active_users do
    Repo.all(from(user in User, where: user.status == :active))
  end

  def get_user(id), do: Repo.get(User, id)

  def get_user_by_short_slug(short_slug), do: Repo.get_by(User, %{short_slug: short_slug})

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a User.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def create_friendship(attrs \\ %{}) do
    %Friendship{}
    |> Friendship.changeset(attrs)
    |> Repo.insert()
  end

  def exists_reverse_friendship?(requester_id, addressee_id) do
    query =
      from(fs in Friendship,
        where: fs.requester_id == ^addressee_id and fs.addressee_id == ^requester_id
      )

    Repo.exists?(query)
  end

  @spec get_user_friendships_by_id(any) :: any
  def get_user_friendships_by_id(id) do
    query =
      from(user in User, where: user.id == ^id, preload: [:friendships, :reverse_friendships])

    Repo.all(query)
  end
end
