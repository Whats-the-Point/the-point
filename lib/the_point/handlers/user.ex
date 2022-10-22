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

  def complete_profile(_, _), do: {:error, "User with already a complete profile"}
end
