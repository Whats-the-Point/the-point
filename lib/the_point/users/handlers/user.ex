defmodule ThePoint.Users.Handler.User do
  @moduledoc """
  Handler for User
  """

  alias ThePoint.Service.SanitizeParams
  alias ThePoint.Services.SetShortSlug
  alias ThePoint.Users.Users

  def complete_profile(%{status: :initiated} = user, params) do
    attrs = SanitizeParams.call(params, ["name", "username"])

    with {:ok, user} <- Users.update_user(user, Map.merge(attrs, %{status: :active})) do
      SetShortSlug.call(user)
    end
  end

  def complete_profile(_, _), do: {:error, 422, "user already active"}

  def submit_new_friendship(current_user, params) do
    with {:ok, addressee_short_slug} <- Map.fetch(params, "addressee_short_slug"),
         addressee <- Users.get_user_by_short_slug(addressee_short_slug),
         false <- Users.user_blocked_me?(current_user.id, addressee.id),
         false <- Users.exists_reverse_friendship?(current_user.id, addressee.id) do
      Users.create_friendship(%{requester_id: current_user.id, addressee_id: addressee.id})
    else
      nil ->
        {:error, :not_found}

      :error ->
        {:error, 422, "no short slug provided"}

      true ->
        {:error, 422, "friendship already exists or you were blocked by this user."}
    end
  end

  def change_friendship_status(current_user, %{
        "status" => status,
        "friendship_id" => friendship_id
      })
      when status in ["accepted", "blocked"] do
    case Users.get_user_pending_friendship(current_user.id, friendship_id) do
      nil ->
        {:error, :not_found}

      friendship ->
        Users.update_friendship(friendship, %{status: status})
    end
  end

  def change_friendship_status(_, _),
    do: {:error, 422, "params not valid"}

  def remove_friendship(current_user, friendship_id) do
    case Users.get_user_friendship(current_user.id, friendship_id) do
      nil ->
        {:error, :not_found}

      friendship ->
        Users.delete_friendship(friendship)
    end
  end

  def get_friends(current_user),
    do: Users.list_friends(current_user.id)

  def get_current_pending_friendships(current_user),
    do: Users.list_user_pending_friendships(current_user.id)

  def get_blocked_users(current_user),
    do: Users.list_user_blocked_friends(current_user.id)
end
