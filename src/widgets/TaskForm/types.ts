import type { ITaskResponse } from "../../shared/types.ts";

export type TaskFormType = "Create" | "Edit";

export interface TaskFormProps {
    isCreating: boolean;
    task?: ITaskResponse;
}
