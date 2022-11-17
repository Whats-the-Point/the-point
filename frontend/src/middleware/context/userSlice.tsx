
import { apiSlice } from "../api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.mutation({
            query: () => ({
                url: '/api/v1/user',
                method: 'GET'
            })
        }),

        completeUser: builder.mutation({
            query: params => ({
                url: '/api/v1/user/complete-profile',
                method: 'POST',
                body: { ...params }
            })
        })
    })
})

export const {
    useGetUserMutation,
    useCompleteUserMutation
} = userApiSlice 