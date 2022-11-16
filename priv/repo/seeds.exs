# Users

alias ThePoint.Users.Users
alias ThePoint.Services.SetShortSlug

{:ok, eric_cartman} =
  Users.create_user(%{
    email: "cartman_bra@gmail.com",
    username: "cartman_bra",
    first_name: "Eric",
    last_name: "Cartman",
    status: :active
  })

{:ok, kenny_mccormick} =
  Users.create_user(%{
    email: "kenny@gmail.com",
    username: "kenny",
    first_name: "Kenny",
    last_name: "McCormick",
    status: :active
  })

{:ok, stan_marsh} =
  Users.create_user(%{
    email: "stan_marsh@gmail.com",
    username: "stan_marsh",
    first_name: "Stan",
    last_name: "Marsh",
    status: :active
  })

{:ok, kyle_broflovski} =
  Users.create_user(%{
    email: "kyle@gmail.com",
    username: "kyle99",
    first_name: "Kyle",
    last_name: "Broflovski",
    status: :active
  })

{:ok, _towelie} =
  Users.create_user(%{
    email: "towelie@gmail.com",
    username: "to_be_defined",
    first_name: "to_be",
    last_name: "defined",
    status: :initiated
  })

Users.list_active_users()
|> Enum.each(&SetShortSlug.call/1)

{:ok, _} =
  Users.create_friendship(%{
    requester_id: eric_cartman.id,
    addressee_id: kenny_mccormick.id,
    status: :accepted
  })

{:ok, _} =
  Users.create_friendship(%{
    requester_id: eric_cartman.id,
    addressee_id: stan_marsh.id,
    status: :accepted
  })

{:ok, _} =
  Users.create_friendship(%{
    requester_id: kyle_broflovski.id,
    addressee_id: stan_marsh.id,
    status: :accepted
  })

{:ok, _} =
  Users.create_friendship(%{
    requester_id: kyle_broflovski.id,
    addressee_id: kenny_mccormick.id,
    status: :requested
  })

{:ok, _} =
  Users.create_friendship(%{
    requester_id: stan_marsh.id,
    addressee_id: kenny_mccormick.id,
    status: :requested
  })

{:ok, _} =
  Users.create_friendship(%{
    requester_id: eric_cartman.id,
    addressee_id: kyle_broflovski.id,
    status: :blocked
  })
