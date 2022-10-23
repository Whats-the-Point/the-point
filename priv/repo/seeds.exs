# Users

alias ThePoint.Users
alias ThePoint.Services.SetShortSlug

{:ok, eric_cartman} =
  Users.create_user(%{
    email: "cartman_bra@gmail.com",
    username: "cartman_bra",
    name: "Eric Cartman",
    status: :active
  })

{:ok, kenny_mccormick} =
  Users.create_user(%{
    email: "kenny@gmail.com",
    username: "kenny",
    name: "Kenny McCormick",
    status: :active
  })

{:ok, stan_marsh} =
  Users.create_user(%{
    email: "stan_marsh@gmail.com",
    username: "stan_marsh",
    name: "Stan Marsh",
    status: :active
  })

{:ok, kyle_broflovski} =
  Users.create_user(%{
    email: "kyle@gmail.com",
    username: "kyle99",
    name: "Kyle Broflovski",
    status: :active
  })

{:ok, towelie} =
  Users.create_user(%{
    email: "towelie@gmail.com",
    username: "to_be_defined",
    name: "to_be_defined",
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
