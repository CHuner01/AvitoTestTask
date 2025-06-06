import type { IFilters } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IFilters = {
    status: [],
    boardId: [],
    search: "",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<IFilters>) => {
            state.status = action.payload.status;
            state.boardId = action.payload.boardId;
        },
        setSearch: (state, action: PayloadAction<IFilters>) => {
            state.search = action.payload.search;
        },
    },
});

export const { setFilters, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
