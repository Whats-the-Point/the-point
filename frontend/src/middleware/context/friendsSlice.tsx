import { apiSlice } from "../api/apiSlice"

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFriends: builder.mutation({
            query: () => ({
                url: '/api/v1/friendship',
                method: 'GET'
            })
        }),

    })
})

export const {
    useGetFriendsMutation
} = friendsApiSlice 