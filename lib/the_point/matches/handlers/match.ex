defmodule ThePoint.Matches.Handler.Match do
  @moduledoc """
  Handler for Matches
  """

  alias ThePoint.Matches.Services.SanitizeMatchParams
  alias ThePoint.Matches

  def create(_user, params) do
    {:ok, attrs} = SanitizeMatchParams.call(params)

    Matches.create_match(attrs)
  end
end
