import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../@types/auth";

const INITIAL_STATE: User = {user: "Logged Out", accessToken: "", renewalToken: "", roles: []}

const sliceCurrentUser = createSlice({
    name: "current_user",
    initialState: INITIAL_STATE,
    reducers: {
        loginCurrentUser(state, { payload }: PayloadAction<User>) {
            return { user: "Logged In", accessToken: payload.accessToken, renewalToken: payload.renewalToken, roles: []}
        }

    }
});

export default sliceCurrentUser.reducer;
export const { loginCurrentUser } = sliceCurrentUser.actions;
export const useCurrentUser = (state: any) => {
    return state.current_user as User;
}