defmodule ThePoint.Users.Services.SubmitNewFriendship do
  @moduledoc """
  Service to submit a new friendship
  """

  alias ThePoint.Users.Users

  def call(requester_id, addressee_short_slug) do
    with addressee <- Users.get_user_by_short_slug(addressee_short_slug),
         false <- Users.user_blocked_me?(requester_id, addressee.id),
         false <- Users.exists_reverse_friendship?(requester_id, addressee.id) do
      Users.create_friendship(%{requester_id: requester_id, addressee_id: addressee.id})
    else
      nil ->
        {:error, :not_found}

      true ->
        {:error, 422, "friendship already exists or you were blocked by this user."}
    end
  end
end
