import type { IBoard } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    boards: IBoard[];
}

const initialState: IInitialState = {
    boards: [],
};
const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload;
        },
    },
});

export const { setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
