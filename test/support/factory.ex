defmodule ThePoint.Factory do
  @moduledoc false
  use ExMachina.Ecto, repo: ThePoint.Repo

  alias ThePoint.Users.User

  def user_factory(attrs \\ %{}) do
    user = %User{
      email: sequence(:email, &"email-#{&1}@remote.com"),
      first_name: sequence(:first_name, &"Hero#{&1}"),
      last_name: sequence(:last_name, &"Boy#{&1}"),
      username: sequence(:name, &"hero_name#{&1}"),
      short_slug: sequence(:user_short_slug, &String.pad_leading("#{&1}", 6, "0")),
      status: :active
    }

    merge_attributes(user, attrs)
  end

  def incomplete_user_factory() do
    %User{
      email: sequence(:email, &"email-#{&1}@remote.com"),
      first_name: nil,
      last_name: nil,
      username: nil,
      short_slug: nil,
      status: :initiated
    }
  end
end
