defmodule ThePoint.Services.GenerateRandomString do
  @moduledoc """
  Generate random string for various ids in the payment file.

  Extracted so this can be injectable, particularly to have control
  over it in tests.
  """

  @doc """
  Generates random string of a given size limit.

  Right now the limitation here is a max size of 32 but that'll be remedied soon.
  """
  @type character_groups :: :numbers | :lowercase_letters | :uppercase_letters

  @character_groups %{
    numbers: Enum.map(0..9, &to_string/1),
    lowercase_letters: Enum.map(?a..?z, &<<&1::utf8>>),
    uppercase_letters: Enum.map(?A..?Z, &<<&1::utf8>>)
  }

  @spec call(pos_integer, [character_groups]) :: String.t()
  def call(max_length, character_groups \\ [:numbers, :lowercase_letters, :uppercase_letters])

  def call(max_length, character_groups) when max_length > 0 do
    character_set =
      @character_groups
      |> Map.take(character_groups)
      |> Map.values()
      |> Enum.concat()

    for _ <- 1..max_length, into: "", do: Enum.random(character_set)
  end

  def call(max_length, _character_groups) do
    raise ArgumentError,
          "You tried to create a random string of length #{max_length} but it needs to be > 0"
  end
end
