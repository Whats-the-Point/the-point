defmodule ThePoint.Value.Response do
  @moduledoc """
  The API Value Response module provides a framework to build response messages for success and for error cases.
  """

  alias Remote.Ecto.Paginator

  alias ThePoint.Composite.Value

  @base_list_response %{data: []}
  @base_map_response %{data: %{}}

  @doc ~S"""
  Initiates a single error message.

  ## Example
     iex> init_with_error("E-mail address not found")
     %{message: "E-mail address not found"}
  """
  def init_with_error(message) when not is_nil(message),
    do: add_error_message(Value.init_with_map(), message)

  @doc ~S"""
  Initiates an empty multiple error message.

  ## Example
     iex> init_with_error()
     %{errors: %{}}
  """
  def init_with_error, do: Value.add(Value.init_with_map(), errors: %{})

  @doc ~S"""
  Adds an error message to an existing response with errors

   ## Example
     iex> response = init_with_error()
     %{errors: %{}}
     iex> add_error(response, email: "E-mail address not found")
     %{errors: %{email: "E-mail address not found"}}

     iex> response = %{}
     %{}
     iex> add_error(response, email: "E-mail address not found")
     ** (KeyError) key :errors not found in: %{}
  """
  def add_error(response, error) do
    new_errors =
      case Map.get(response, :errors) do
        nil ->
          {:error, :uninitialized_api_response}

        errors ->
          Value.add(errors, error)
      end

    Map.replace!(response, :errors, new_errors)
  end

  @doc ~S"""
  Adds a single error message to an error response.


  ## Example
     iex> response = init_with_error()
     %{errors: %{}}
     iex> response = add_error(response, email: "E-mail address not found")
     %{errors: %{email: "E-mail address not found"}}
     iex> add_error_message(response, "Account creation failed")
     %{errors: %{email: "E-mail address not found"}, message: "Account creation failed"}
  """
  def add_error_message(response, message), do: Value.add(response, message: message)

  @doc ~S"""
  Initiates a Map or List based response.

  ## Example
    iex> init(%{email: "user@email.com"})
    %{data: %{email: "user@email.com"}}

    iex> init([%{email: "user@email.com"}])
    %{data: [%{email: "user@email.com"}]}

  """
  def init(value) when is_map(value), do: replace_data(init_with_map(), value)

  def init(value) when is_list(value), do: replace_data(init_with_list(), value)

  @doc ~S"""
  Adds an entry to the response map or list.

  ## Example
    iex> response = init_with_map()
    %{data: %{}}
    iex> _response = add(response, user_id: 1)
    %{data: %{user_id: 1}}
    iex> response = init_with_list()
    %{data: []}
    iex> _response = add(response, 1)
    %{data: [1]}

     iex> response = %{}
     %{}
     iex> add(response, user_id: 1)
     ** (KeyError) key :data not found in: %{}
  """
  def add(response, value) do
    new_data =
      case Map.get(response, :data) do
        nil ->
          {:error, :uninitialized_api_response}

        data ->
          Value.add(data, value)
      end

    Map.replace!(response, :data, new_data)
  end

  @doc ~S"""
  Add a field to the top level of the json response, used as a meta field

  ## Example
    iex> response = init_with_map()
    %{data: %{}}
    iex> _response = add_meta(response, total: 1)
    %{data: %{}, total: 1}
  """
  def add_meta(response, value), do: Value.add(response, value)

  @doc ~S"""
  Initiate Response with base map structure.

  ## Example
   iex> _response = init_with_map()
   %{data: %{}}
  """
  def init_with_map, do: @base_map_response

  @doc ~S"""
  Initiate Response with base list structure.

  ## Example
    iex> _response = init_with_list()
    %{data: []}
  """
  def init_with_list, do: @base_list_response

  @doc ~S"""
  Initiate Response with pagination values, but doesn't deal with `data` values

  ## Example
    iex> paginated_values = %{current_page: 1,total_pages: 10,data: [1,2,3],total_count: nil}
    iex> _response = init_with_pagination(paginated_values)
    %{data: %{current_page: 1, total_count: nil, total_pages: 10}}
  """
  @spec init_with_pagination(Paginator.t()) :: map()
  def init_with_pagination(paginated_values) do
    init_with_map()
    |> add(total_pages: paginated_values.total_pages)
    |> add(current_page: paginated_values.current_page)
    |> add(total_count: paginated_values.total_count)
  end

  @doc ~S"""
  Initiate Response with pagination values, it takes the values inside the `data_key` and applies the `function` to it,
  after it place the return of the function on the map using the key defined on `response_key`

  ## Example
    # A sample function to add 1 to all numbers on a list
    iex> transforming_function = fn x -> Enum.map(x, fn y -> y + 1 end) end
    iex> paginated_values = %{current_page: 1,total_pages: 10,data: [1,2,3],total_count: nil}
    iex> _response = init_with_pagination_values(paginated_values, transforming_function, :sums, :data)
    %{data: %{sums: [2, 3, 4], current_page: 1, total_count: nil, total_pages: 10}}
  """
  @spec init_with_pagination_values(Paginator.t(), function(), atom(), atom()) :: map()
  def init_with_pagination_values(paginated_values, function, response_key, data_key \\ :data) do
    data_list = Map.get(paginated_values, data_key)
    transformed_data = function.(data_list)

    response = init_with_pagination(paginated_values)
    add(response, [{response_key, transformed_data}])
  end

  defp replace_data(response, value), do: Map.replace!(response, :data, value)
end
