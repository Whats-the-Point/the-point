import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, role: null },
    reducers: {
        setCredentials: (state, action) => {
            const { access_token, user_status } = action.payload
            state.token = access_token
            state.role = user_status
        },

        setRole: (state, action) => {
            const { role } = action.payload
            state.role = action.payload
        },

        setUser: (state, action) => {
            state.user = action.payload
        },

        logOut: (state, action) => {
            state.token = null
            state.role = null
        }
    }
})

export const { setCredentials, setRole, setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRole = (state) => state.auth.role
export const selectCurrentUser = (state) => state.auth.user