import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFilters } from "../../types.ts";

const initialState: IFilters = {
    status: [],
    boardId: [],
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<IFilters>) => {
            state.status = action.payload.status;
            state.boardId = action.payload.boardId;
        },
    },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
