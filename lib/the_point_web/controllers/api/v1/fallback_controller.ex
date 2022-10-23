defmodule ThePointWeb.API.V1.FallbackController do
  use ThePointWeb, :controller

  def call(conn, {:error, :bad_request, error}) do
    call(conn, {:error, {:bad_request, error}})
  end

  def call(conn, {:error, {:bad_request, error}}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("400.json", error: error)
  end

  def call(conn, {:error, {:payment_required, error}}) do
    conn
    |> put_status(:payment_required)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("402.json", error: error)
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:forbidden)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("403.json")
  end

  def call(conn, {:error, {:unauthorized, message}}) do
    conn
    |> put_status(:forbidden)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("403.json", message: message)
  end

  def call(conn, {:error, {:forbidden, message}}) do
    conn
    |> put_status(:forbidden)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("403.json", message: message)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(404)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("404.json")
  end

  def call(conn, {:error, {:not_found, reason}}) do
    conn
    |> put_status(404)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("404.json", reason: reason)
  end

  def call(conn, {:error, {:invalid_params, message}}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", reason: message)
  end

  def call(conn, {:error, {status_code, reason}}) when is_integer(status_code) do
    conn
    |> put_status(status_code)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("500.json", reason: reason)
  end

  def call(conn, {:error, {:conflict, reason}}) do
    conn
    |> put_status(409)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("409.json", reason: reason)
  end

  def call(conn, {:error, slug, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(400)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("400.json", slug: slug, reason: changeset)
  end

  def call(conn, {:error, {multi_name, slug}, failed_value, _successful_changes}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", name: multi_name, slug: slug, changeset: failed_value)
  end

  def call(conn, {:error, multi_name, changeset = %Ecto.Changeset{}, _successful_changes}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", name: multi_name, changeset: changeset)
  end

  def call(conn, {:error, _multi_name, error, _}) do
    call(conn, {:error, error})
  end

  def call(conn, {:error, {_event, error = %Ecto.Changeset{}}}) do
    call(conn, {:error, error})
  end

  def call(conn, {:error, changeset = %Ecto.Changeset{}}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", changeset: changeset)
  end

  def call(conn, {:error, %{file: reason}}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", file: reason)
  end

  def call(conn, {:error, reason}) when is_map(reason) and not is_struct(reason) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", reason: reason)
  end

  def call(conn, {:error, slug, :not_found}) do
    conn
    |> put_status(404)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("404.json", reason: "#{slug} resource not found")
  end

  def call(conn, {:error, status_code, reason}) when is_integer(status_code) do
    conn
    |> put_status(status_code)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("#{status_code}.json", reason: reason)
  end

  def call(conn, {:error, {:unprocessable_entity, error}}) when is_tuple(error) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", error: error)
  end

  def call(conn, {:error, {:unprocessable_entity, reason}}) do
    conn
    |> put_status(422)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("422.json", reason: reason)
  end

  def call(conn, {:error, reason}) do
    conn
    |> put_status(500)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("500.json", reason: reason)
  end

  @doc """
  Controller action to be used when the request was rate limited.
  """
  def handle_rate_limit_deny(conn, _opts) do
    conn
    |> put_status(429)
    |> put_view(ThePointWeb.API.V1.ErrorView)
    |> render("429.json")
    |> halt()
  end
end
