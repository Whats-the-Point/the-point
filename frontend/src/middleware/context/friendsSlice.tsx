import { apiSlice } from "../api/apiSlice"

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFriends: builder.query({
            query: () => '/api/v1/friendship'
        })

    })
})

export const {
    useGetFriendsQuery
} = friendsApiSlice 