defmodule ThePoint.Composite.Value do
  @moduledoc """
  Macro to allow better API Response composition. With this module we're able
  to compose complex json messages faster and simpler.

  A Response base format can only be a List or a Map.
  """

  @doc """
  Builds the value's result given the map of data.
  """
  @callback build(map()) :: map()

  def build(module, data, opts \\ []) do
    data
    |> module.build()
    |> filter_fields(opts)
    |> remove_fields(opts)
  end

  defp filter_fields(value, opts) do
    case Keyword.get(opts, :only) do
      nil -> value
      fields -> ThePoint.Composite.Value.only(value, fields)
    end
  end

  defp remove_fields(value, opts) do
    case Keyword.get(opts, :except) do
      nil -> value
      fields -> ThePoint.Composite.Value.except(value, fields)
    end
  end

  @doc """
  Initiate a Response base format as a List

  ## Examples
      iex> init_with_list()
      []
  """
  def init_with_list, do: []

  @doc """
  Initiate a Response base format as a Map

  ## Examples
      iex> init_with_map()
      %{}
  """
  def init_with_map, do: %{}

  @doc """
  Initiate a Response based on a pre-existing Struct.

  ## Examples
      iex> country = %Country{name: "Portugal", region: "Europe", slug: "slug", code: "code", benefit_plans: [], benefit_details: [], contracts: [], currency_id: nil, currency: nil, addresses: [], payslips: [], country_subdivisions: [], holidays: []}
      %Country{name: "Portugal", region: "Europe", slug: "slug", code: "code", benefit_plans: [], benefit_details: [], contracts: [], currency: nil, addresses: [], features: [], payslips: [], country_subdivisions: [], holidays: []}
      iex> init(country)
      %{benefit_plans: [], benefit_details: [], contracts: [], id: nil, inserted_at: nil, name: "Portugal", region: "Europe", slug: "slug", code: "code", updated_at: nil, currency: nil, currency_id: nil, addresses: [], features: [], payslips: [], country_subdivisions: [], holidays: []}

      iex> init(%{a: 1})
      %{a: 1}
      iex> init([1, 2, 3])
      [1, 2, 3]
  """
  def init(%{__struct__: _} = value) do
    value
    |> Map.from_struct()
    |> Map.drop([:__meta__, :__struct__])
  end

  # Initiate a Response based on a pre-existing Map or List.
  def init(value) do
    value
  end

  @doc """
  Remove specified keys from Response.

  ## Examples
      iex> response = init(%{a: 1, b: 2})
      %{a: 1, b: 2}
      iex> except(response, [:a])
      %{b: 2}
  """
  def except(response, keys) when is_map(response), do: Map.drop(response, keys)

  @doc """
  Return only specified keys from Response.

  ## Examples
      iex> response = init(%{a: 1, b: 2})
      %{a: 1, b: 2}
      iex> only(response, [:a])
      %{a: 1}
  """
  def only(response, keys) when is_map(response), do: Map.take(response, keys)

  @doc """
  Add an item to a Response list.

  ## Examples
      iex> response = init([1, 2, 3])
      [1, 2, 3]
      iex> add(response, 4)
      [4, 1, 2, 3]

      iex> response = init(%{a: 1, b: 2})
      %{a: 1, b: 2}
      iex> add(response, %{c: 3})
      %{a: 1, b: 2, c: 3}
      iex> add(response, c: 3)
      %{a: 1, b: 2, c: 3}
  """
  def add(response, entry) when is_list(response), do: [entry | response]

  # Add an item to a Response Map. Accepts a Map or a simple keyword list.
  def add(response, entry) when is_map(response) do
    Enum.reduce(entry, response, fn {key, value}, acc ->
      Map.put(acc, key, value)
    end)
  end

  @doc """
  Removes keys with `nil` values from the map
  """
  def compact(map) do
    map
    |> Enum.reject(fn {_, value} -> is_nil(value) end)
    |> Map.new()
  end

  @doc """
  Modifies provided key by applying provided function.
  If key is not present it won't be updated, no exception will be raised.

  ## Examples
      iex> response = init(%{a: 1, b: 2})
      %{a: 1, b: 2}
      iex> modify(response, :b, fn val -> val * 2 end)
      %{a: 1, b: 4}
      iex> modify(response, :c, fn val -> val * 2 end)
      %{a: 1, b: 2}
  """
  def modify(data, key, fun) when is_map(data) and is_function(fun) do
    data
    |> Map.update(key, nil, fun)
    |> compact()
  end

  @doc """
  build associations with their own 'Value' modules when their are present,
  avoiding `nil` or unloaded structs
  """
  def build_assoc(value_module, assoc, fields \\ nil)
  def build_assoc(_value_module, nil, _), do: nil
  def build_assoc(_value_module, %Ecto.Association.NotLoaded{}, _), do: nil
  def build_assoc(value_module, assoc, nil), do: value_module.build(assoc)
  def build_assoc(value_module, assoc, fields), do: value_module.build(assoc, fields)
end
