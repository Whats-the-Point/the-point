defmodule ThePointWeb.API.V1.FriendshipControllerTest do
  use ThePointWeb.ConnCase, async: true

  import ThePoint.Factory

  describe "List user's friends" do
    test "requires user log in", %{conn: conn} do
      insert(:user)
      conn = get(conn, Routes.api_v1_friendship_path(conn, :index))
      assert json_response(conn, 401)
    end

    test "returns the user successfully", %{conn: conn} do
      user = insert(:user)

      response =
        conn
        |> assign_current_user(user)
        |> get(Routes.api_v1_friendship_path(conn, :index))
        |> json_response(:ok)
   end
  end
end
