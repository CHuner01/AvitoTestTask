import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice.ts";
import searchReducer from "./slices/searchSlice.ts";

const rootReducer = combineReducers({
    filters: filtersReducer,
    searchReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
