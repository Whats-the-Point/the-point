defmodule ThePoint.Service.SanitizeParams do
  @moduledoc """
  This module sanitize params
  """

  @spec call(nil | map(), list(String.t())) :: map()
  def call(nil, _), do: %{}

  def call(params, valid_fields) when is_list(params),
    do: Enum.map(params, fn params -> call(params, valid_fields) end)

  def call(params, valid_fields) do
    params
    |> Map.take(valid_fields)
    |> convert_map_keys_to_atom()
  end

  @spec sanitize_boolean_params(map(), term()) :: map()
  def sanitize_boolean_params(params, key) when is_map_key(params, key) do
    Map.update(params, key, nil, fn
      "false" -> false
      "true" -> true
      value -> value
    end)
  end

  def sanitize_boolean_params(params, _), do: params

  def sanitize_nil_params(params, key, empty \\ ["none", ""])

  def sanitize_nil_params(params, key, empty) when is_map_key(params, key) do
    Map.update!(params, key, fn value ->
      if Enum.member?(empty, value), do: nil, else: value
    end)
  end

  def sanitize_nil_params(params, _, _), do: params

  defmodule InvalidEnumException do
    defexception message: "invalid enum value"
  end

  def sanitize_enum_params(params, field, enum_module) do
    params = Map.update(params, field, nil, &handle_sanitize_enum_value(&1, enum_module))
    {:ok, params}
  rescue
    InvalidEnumException -> {:error, {:invalid_params, "invalid value for field '#{field}'"}}
  end

  defp handle_sanitize_enum_value(value, enum_module) when is_list(value) do
    value
    |> Enum.map(&handle_sanitize_enum_value(&1, enum_module))
    |> Enum.reject(&is_nil/1)
  end

  defp handle_sanitize_enum_value(value, enum_module) do
    case enum_module.cast(value) do
      {:ok, value} -> value
      _ -> raise InvalidEnumException
    end
  end

  # sobelow_skip ["DOS.StringToAtom"]
  defp convert_map_keys_to_atom(opts),
    do: Map.new(opts, fn {key, value} -> {String.to_atom(key), value} end)
end
