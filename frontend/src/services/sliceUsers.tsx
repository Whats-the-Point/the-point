import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    auth_token: string,
    renew_token: string
}

const INITIAL_STATE: User = {auth_token: "", renew_token: "" }

const sliceCurrentUser = createSlice({
    name: "current_user",
    initialState: INITIAL_STATE,
    reducers: {
        loginCurrentUser(state, {payload}: PayloadAction<User>) {
            return {auth_token: payload.auth_token, renew_token: payload.renew_token}
        }

    }
});

export default sliceCurrentUser.reducer;
export const { loginCurrentUser } = sliceCurrentUser.actions;
export const useCurrentUser = (state: any) => {
    return state.current_user as User;
}