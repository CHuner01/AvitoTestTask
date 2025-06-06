import type { ITaskResponse } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    tasks: ITaskResponse[];
}

const initialState: IInitialState = {
    tasks: [],
};
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<ITaskResponse[]>) => {
            state.tasks = action.payload;
        },
    },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
