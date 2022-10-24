defmodule ThePointWeb.API.V1.UserControllerTest do
  use ThePointWeb.ConnCase, async: true

  import ThePoint.Factory

  describe "Show user" do
    test "requires user log in", %{conn: conn} do
      insert(:user)
      conn = get(conn, Routes.api_v1_user_path(conn, :show))
      assert json_response(conn, 401)
    end

    test "returns the user successfully", %{conn: conn} do
      user = insert(:user)

      response =
        conn
        |> assign_current_user(user)
        |> get(Routes.api_v1_user_path(conn, :show))
        |> json_response(:ok)

      assert response["name"]
      assert response["email"]
      assert response["username"]
      assert response["short_slug"]
      assert response["status"]
    end
  end

  describe "complete user profile" do
    test "requires user log in", %{conn: conn} do
      insert(:user)
      conn = post(conn, Routes.api_v1_user_path(conn, :complete_profile, %{}))
      assert json_response(conn, 401)
    end

    test "returns the user successfully", %{conn: conn} do
      user = insert(:incomplete_user)

      params = %{
        "name" => "John Doe",
        "username" => "john_doe99"
      }

      response =
        conn
        |> assign_current_user(user)
        |> post(Routes.api_v1_user_path(conn, :complete_profile), params)
        |> json_response(:ok)

      assert response == %{"data" => %{"status" => "ok"}}
    end

    test "returns errors with missing params", %{conn: conn} do
      user = insert(:incomplete_user)

      response =
        conn
        |> assign_current_user(user)
        |> post(Routes.api_v1_user_path(conn, :complete_profile), %{})
        |> json_response(422)

      assert errors = response["errors"]
      assert errors == %{"name" => ["can't be blank"], "username" => ["can't be blank"]}
    end

    test "returns errors with user already active", %{conn: conn} do
      user = insert(:user)

      response =
        conn
        |> assign_current_user(user)
        |> post(Routes.api_v1_user_path(conn, :complete_profile), %{})
        |> json_response(422)

      assert response == %{"message" => "user already active"}
    end

    test "returns errors unique username", %{conn: conn} do
      insert(:user, username: "john_doe")
      user = insert(:incomplete_user)

      params = %{
        "name" => "John Doe",
        "username" => "john_doe"
      }

      response =
        conn
        |> assign_current_user(user)
        |> post(Routes.api_v1_user_path(conn, :complete_profile), params)
        |> json_response(422)

      assert errors = response["errors"]
      assert errors == %{"username" => ["has already been taken"]}
    end

    test "returns error with not a valid username", %{conn: conn} do
      user = insert(:incomplete_user)

      params = %{
        "name" => "John Doe",
        "username" => "john__doe"
      }

      response =
        conn
        |> assign_current_user(user)
        |> post(Routes.api_v1_user_path(conn, :complete_profile), params)
        |> json_response(422)

      assert errors = response["errors"]
      assert errors == %{"username" => ["not valid. please respect the rules"]}
    end
  end
end
