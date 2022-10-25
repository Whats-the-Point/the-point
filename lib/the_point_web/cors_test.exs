defmodule ThePointWeb.CORSTest do
  @moduledoc """
  Test module responsible for testing that CORS is properly configured for the API.
  """

  use ThePointWeb.ConnCase, async: true

  import ThePoint.Factory

  @allowed_origin ~r/^https:\/\/(.+\.)*remote.com$/

  setup do
    user = insert(:user)
    [user: user]
  end

  test "request succeeds with website domain", %{conn: conn, user: user} do
    conn =
      conn
      |> assign_current_user(user)
      |> put_private(:cors_allowed_origin, @allowed_origin)
      |> put_req_header("origin", "https://employ.remote.com")
      |> get(Routes.api_v1_friendship_path(conn, :index))

    assert conn.status == 200
    assert get_resp_header(conn, "access-control-allow-origin") == ["https://employ.remote.com"]
  end

  test "request succeeds with employ domain", %{conn: conn, user: user} do
    conn =
      conn
      |> assign_current_user(user)
      |> put_private(:cors_allowed_origin, @allowed_origin)
      |> put_req_header("origin", "https://remote.com")
      |> get(Routes.api_v1_friendship_path(conn, :index))

    assert conn.status == 200
    assert get_resp_header(conn, "access-control-allow-origin") == ["https://remote.com"]
  end

  test "request succeeds with multiple subdomains", %{conn: conn, user: user} do
    conn =
      conn
      |> assign_current_user(user)
      |> put_private(:cors_allowed_origin, @allowed_origin)
      |> put_req_header("origin", "https://about.us.remote.com")
      |> get(Routes.api_v1_friendship_path(conn, :index))

    assert conn.status == 200
    assert get_resp_header(conn, "access-control-allow-origin") == ["https://about.us.remote.com"]
  end

  test "headers are not returned if domain simply ends with remote.com", %{conn: conn, user: user} do
    conn =
      conn
      |> assign_current_user(user)
      |> put_private(:cors_allowed_origin, @allowed_origin)
      |> put_req_header("origin", "https://bananaremote.com")
      |> get(Routes.api_v1_friendship_path(conn, :index))

    assert conn.status == 200
    assert get_resp_header(conn, "access-control-allow-origin") == []
  end

  test "headers are not returned if domain is not allowed", %{conn: conn, user: user} do
    conn =
      conn
      |> assign_current_user(user)
      |> put_req_header("origin", "https://croquetes.pt")
      |> get(Routes.api_v1_friendship_path(conn, :index))

    assert conn.status == 200
    assert get_resp_header(conn, "access-control-allow-origin") == []
  end
end
