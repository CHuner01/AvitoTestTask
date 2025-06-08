import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface searchInitialState {
    search: string;
}

const initialState: searchInitialState = {
    search: "",
};

/** Стор, хранящий параметр search */
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
