import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasksSlice.ts";
import boardReducer from "./slices/boardsSlice.ts";
import usersReducer from "./slices/usersSlice.ts";
import filtersReducer from "./slices/filtersSlice.ts";

const rootReducer = combineReducers({
    tasks: taskReducer,
    boards: boardReducer,
    users: usersReducer,
    filters: filtersReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
