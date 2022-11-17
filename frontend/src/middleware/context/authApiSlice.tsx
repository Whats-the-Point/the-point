
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: () => ({
                url: '/api/v1/auth/google/new',
                method: 'GET'
            })
        }),

        callback: builder.mutation({
            query: credentials => ({
                url: '/api/v1/auth/google/callback',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        renew: builder.mutation({
            query: () => ({
                url: '/api/v1/session/renew',
                method: 'GET',
                withCredentials: true
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
    useCallbackMutation,
    useLogoutMutation,
    useRenewMutation
} = authApiSlice