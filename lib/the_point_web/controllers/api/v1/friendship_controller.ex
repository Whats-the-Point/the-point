defmodule ThePointWeb.API.V1.FriendshipController do
  use ThePointWeb, :controller
  use ThePointWeb.CurrentUser

  alias ThePoint.Users.Handler.User

  action_fallback(ThePointWeb.API.V1.FallbackController)

  @doc """
  Gets the list of current associated friends (already accepted)

  ## Request:

  `GET /api/v1/friendship`

  Response 200:
  {
    "data": {
        "friends": [
            {
                "email": "cartman_bra@gmail.com",
                "first_name": "Eric",
                "last_name": "Cartman",
                "short_slug": "U6DHRQ",
                "status": "active",
                "username": "cartman_bra"
            },
            {
                "email": "kenny@gmail.com",
                "first_name": "Kenny",
                "last_name": "McCormick",
                "short_slug": "MHNCDH",
                "status": "active",
                "username": "kenny"
            },
            {
                "email": "stan_marsh@gmail.com",
                "first_name": "Stan",
                "last_name": "Marsh",
                "short_slug": "MHPLBD",
                "status": "active",
                "username": "stan_marsh"
            }
        ]
    }
  }
  """
  def index(conn, _, current_user) do
    accepted_friends = User.get_friends(current_user)
    render(conn, "index.json", %{friends: accepted_friends})
  end

  @doc """
  Gets the list of current blocked users

  ## Request:

  `GET /api/v1/friendship/blocked`

  Response 200:
  {
    "data": {
        "friends": [
            {
                "email": "cartman_bra@gmail.com",
                "first_name": "Eric",
                "last_name": "Cartman",
                "short_slug": "U6DHRQ",
                "status": "active",
                "username": "cartman_bra"
            },
            {
                "email": "kenny@gmail.com",
                "first_name": "Kenny",
                "last_name": "McCormick",
                "short_slug": "MHNCDH",
                "status": "active",
                "username": "kenny"
            }
        ]
    }
  }
  """
  def blocked_users(conn, _, current_user) do
    blocked_friends = User.get_blocked_users(current_user)
    render(conn, "index.json", %{blocked_users: blocked_friends})
  end

  @doc """
  Gets the list of pending friendships to be accepted or deleted
  ## Request:

  `GET /api/v1/friendship/pending`

  Response 200:
  {
    "data": {
        "friendships": [
            {
                "id": 10,
                "requester": {
                    "email": "cartman_bra@gmail.com",
                    "first_name": "Eric",
                    "last_name": "Cartman",
                    "short_slug": "U6DHRQ",
                    "status": "active",
                    "username": "cartman_bra"
                },
                "status": "requested"
            },
            {
                "id": 11,
                "requester": {
                    "email": "kenny@gmail.com",
                    "first_name": "Kenny",
                    "last_name": "McCormick",
                    "short_slug": "MHNCDH",
                    "status": "active",
                    "username": "kenny"
                },
                "status": "requested"
            }
        ]
    }
  }
  """
  def list_pending(conn, _, current_user) do
    friendships = User.get_current_pending_friendships(current_user)
    render(conn, "list_pending.json", %{friendships: friendships})
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

  def search_friends(conn, %{"username" => username}, current_user) do
    friends = User.search_friends_by_username(username, current_user)
    render(conn, "index.json", %{friends: friends})
  end
end
