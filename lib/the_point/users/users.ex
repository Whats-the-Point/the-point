defmodule ThePoint.Users.Users do
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

  def list_friends(user_id) do
    requested_friends =
      from(user in User,
        join: fs in assoc(user, :friendships),
        where: fs.addressee_id == ^user_id and fs.status == :accepted,
        where: user.id != ^user_id
      )

    addressed_friends =
      from(user in User,
        join: fs in assoc(user, :reverse_friendships),
        where: fs.requester_id == ^user_id and fs.status == :accepted,
        where: user.id != ^user_id
      )

    Repo.all(requested_friends) ++ Repo.all(addressed_friends)
  end

  def list_user_pending_friendships(user_id) do
    query =
      from(fs in Friendship,
        join: user in assoc(fs, :requester),
        where: fs.addressee_id == ^user_id and fs.status == :requested,
        where: user.id != ^user_id,
        preload: [:requester]
      )

    Repo.all(query)
  end

  def list_user_blocked_friends(user_id) do
    query =
      from(user in User,
        join: fs in assoc(user, :friendships),
        where: fs.addressee_id == ^user_id and fs.status == :blocked,
        where: user.id != ^user_id
      )

    Repo.all(query)
  end

  def user_blocked_me?(user_id, addressee_id) do
    query =
      from(user in User,
        join: fs in assoc(user, :reverse_friendships),
        where:
          fs.requester_id == ^user_id and fs.addressee_id == ^addressee_id and
            fs.status == :blocked
      )

    Repo.exists?(query)
  end

  def get_user_pending_friendship(user_id, friendship_id) do
    query =
      from(fs in Friendship,
        where: fs.id == ^friendship_id and fs.addressee_id == ^user_id and fs.status == :requested
      )

    Repo.one(query)
  end

  def get_friendship(id), do: Repo.get(Friendship, id)

  def get_user_friendship(user_id, id) do
    query =
      from(fs in Friendship,
        where: fs.addressee_id == ^user_id or fs.requester_id == ^user_id,
        where: fs.id == ^id and fs.status in [:requested, :accepted]
      )

    Repo.one(query)
  end

  def create_friendship(attrs \\ %{}) do
    %Friendship{}
    |> Friendship.changeset(attrs)
    |> Repo.insert()
  end

  def update_friendship(%Friendship{} = friendship, attrs \\ %{}) do
    friendship
    |> Friendship.changeset(attrs)
    |> Repo.update()
  end

  def delete_friendship(%Friendship{} = friendship) do
    Repo.delete(friendship)
  end

  def exists_reverse_friendship?(requester_id, addressee_id) do
    query =
      from(fs in Friendship,
        where: fs.requester_id == ^addressee_id and fs.addressee_id == ^requester_id
      )

    Repo.exists?(query)
  end
end
