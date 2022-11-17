
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/v1/auth/google/callback',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/api/v1/session',
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation
} = authApiSlice