defmodule ThePoint.Handler.User do
  @moduledoc """
  Handler for User
  """

  alias ThePoint.Service.SanitizeParams
  alias ThePoint.Services.SetShortSlug
  alias ThePoint.Users

  def complete_profile(%{status: :initiated} = user, params) do
    attrs = SanitizeParams.call(params, ["name", "username"])

    with {:ok, user} <- Users.update_user(user, Map.merge(attrs, %{status: :active})),
         {:ok, user} <- SetShortSlug.call(user) do
      {:ok, user}
    end
  end

  def complete_profile(_, _), do: {:error, 422, "user already active"}

  def submit_new_friendship(current_user, addressee_short_slug) do
    with addressee <- Users.get_user_by_short_slug(addressee_short_slug),
         false <- Users.user_blocked_me?(current_user.id, addressee.id),
         false <- Users.exists_reverse_friendship?(current_user.id, addressee.id) do
      Users.create_friendship(%{requester_id: current_user.id, addressee_id: addressee.id})
    else
      nil ->
        {:error, :not_found}

      true ->
        {:error, 422, "friendship already exists or you were blocked by this user."}
    end
  end

  def get_friends(current_user),
    do: Users.get_friends(current_user.id)

  def get_current_pending_friendships(current_user),
    do: Users.get_user_pending_friendships(current_user.id)

  def get_blocked_users(current_user),
    do: Users.get_user_blocked_friends(current_user.id)
end
