defmodule ThePoint.Users.Services.SubmitNewFriendship do
  @moduledoc """
  Service to submit a new friendship
  """

  alias ThePoint.Users.Users

  def call(requester_id, addressee_short_slug) do
    with addressee <- Users.get_user_by_short_slug(addressee_short_slug),
         :ok <- is_requester_blocked_by_addressee(requester_id, addressee.id),
         :ok <- validate_no_reverse_friendship(requester_id, addressee.id) do
      Users.create_friendship(%{requester_id: requester_id, addressee_id: addressee.id})
    else
      nil ->
        {:error, :not_found}

      {:error, message} ->
        {:error, 422, message}
    end
  end

  defp is_requester_blocked_by_addressee(requester_id, addressee_id) do
    case Users.user_blocked_me?(requester_id, addressee_id) do
      false ->
        :ok
      true ->
        {:error, "you are blocked by this user"}
    end
  end

  defp validate_no_reverse_friendship(requester_id, addressee_id) do
    case Users.exists_reverse_friendship?(requester_id, addressee_id) do
      false ->
        :ok
      true ->
        {:error, "friendship already exists"}
    end
  end
end
