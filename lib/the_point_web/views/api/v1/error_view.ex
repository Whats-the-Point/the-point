defmodule ThePointWeb.API.V1.ErrorView do
  use ThePointWeb, :view

  alias Ecto.Changeset

  alias ThePoint.Value.Response
  alias ThePointWeb.ErrorHelpers

  def render("400.json", %{error: {error_type, message}}) do
    Response.add_error(Response.init_with_error(), %{"#{error_type}" => message})
  end

  def render("400.json", %{error: error}), do: Response.init_with_error(error)

  def render("400.json", %{slug: slug, reason: %Changeset{} = changeset}) do
    errors = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)

    Response.add_error(Response.init_with_error(), %{"#{slug}" => errors})
  end

  def render("401.json", _assigns), do: Response.init_with_error("Unauthorized")

  def render("402.json", %{error: error}),
    do: Response.add_error(Response.init_with_error(), error)

  def render("403.json", %{message: message}), do: Response.init_with_error(message)
  def render("403.json", _assigns), do: Response.init_with_error("Forbidden")

  def render("404.json", %{reason: reason}), do: Response.init_with_error(reason)
  def render("404.json", _assigns), do: Response.init_with_error("Not found")

  def render("409.json", %{reason: reason}), do: Response.init_with_error(reason)
  def render("409.json", _assigns), do: Response.init_with_error("Conflict")

  def render("422.json", %{name: name, changeset: %Changeset{} = changeset}) do
    errors = gather_changeset_errors(changeset)

    Response.add_error(Response.init_with_error(), %{name => errors})
  end

  def render("422.json", %{changeset: %Changeset{} = changeset}) do
    errors = gather_changeset_errors(changeset)

    Response.add_error(Response.init_with_error(), errors)
  end

  def render("422.json", %{file: reason}) do
    Response.add_error(Response.init_with_error(), %{file: reason})
  end

  def render("422.json", %{error: {error_type, message}}) do
    Response.add_error(Response.init_with_error(), %{"#{error_type}" => message})
  end

  def render("422.json", %{reason: reason}) do
    Response.init_with_error(reason)
  end

  def render("500.json", %{reason: {error_code, message}})
      when is_atom(error_code) and is_binary(message) do
    # For cases like {:error, {:some_specific_error, "Human-readable message"}}
    Response.init_with_error(message)
  end

  def render("500.json", %{reason: message}) when is_binary(message) or is_atom(message) do
    Response.init_with_error(message)
  end

  def render("500.json", %{reason: errors}) when is_map(errors) do
    errors = traverse_changeset_errors(errors)

    Response.add_error(Response.init_with_error(), errors)
  end

  def render("500.json", %{reason: {:auth0, reason}}) do
    Response.init_with_error(reason)
  end

  def render("429.json", _assigns), do: Response.init_with_error("Too many requests")

  defp traverse_changeset_errors(errors) do
    Enum.reduce(errors, %{}, fn
      {key, %Changeset{} = changeset}, acc ->
        error = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)
        Map.put(acc, key, error)

      {key, value}, acc ->
        Map.put(acc, key, value)
    end)
  end

  defp gather_changeset_errors(changeset) do
    changeset
    |> Changeset.traverse_errors(&ErrorHelpers.translate_error/1)
  end
end
