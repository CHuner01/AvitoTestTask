import type { IUser } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    users: IUser[];
}

const initialState: IInitialState = {
    users: [],
};
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
