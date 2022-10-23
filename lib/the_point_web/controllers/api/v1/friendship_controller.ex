defmodule ThePointWeb.API.V1.FriendshipController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Handler.User

  action_fallback(ThePointWeb.API.V1.FallbackController)

  @doc """
  Creates friendship for current_user with a short slug of a user

  ## Request:

  `GET /api/v1/friendship`

  Response 200:

  {
    "data": {
        "status": "ok"
    }
  }

  """
  def index(conn, _, current_user) do
    accepted_friends = User.get_friends(current_user)
    render(conn, "index.json", %{friends: accepted_friends})
  end

  @doc """
  Creates friendship for current_user with a short slug of a user

  ## Request:

  `POST /api/v1/friendship/create`

  Params:
    * addressee_short_slug

  Response 200:

  {
    "data": {
        "status": "ok"
    }
  }

  """
  def create(conn, params, current_user) do
    with {:ok, _friendship} <- User.submit_new_friendship(current_user, params) do
      render(conn, "success.json")
    end
  end

  @doc """
  Change status of friendship from :requested to :accepted or :blocked

  ## Request:

  `POST /api/v1/friendship/change_status`

  Params:
    * friendship_id
    * status

  Response 200:

  {
    "data": {
        "status": "ok"
    }
  }

  """
  def change_status(conn, params, current_user) do
    with {:ok, _friendship} <- User.change_friendship_status(current_user, params) do
      render(conn, "success.json")
    end
  end

  @doc """
  Delete requested or accepted friendship

  ## Request:

  `DELETE /api/v1/friendship/delete/:friendship_id`

  Response 200:

  {
    "data": {
        "status": "ok"
    }
  }

  """
  def delete(conn, %{"friendship_id" => friendship_id}, current_user) do
    with {:ok, _} <- User.remove_friendship(current_user, friendship_id) do
      render(conn, "success.json")
    end
  end
end
