import { z } from "zod";

export type TStatus = "Backlog" | "InProgress" | "Done";
export type TPriority = "Low" | "Medium" | "High";

export interface IUser {
    id: number;
    email: string;
    fullName: string;
    avatarUrl: string;
}

export const taskRequestSchema = z.object({
    title: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(255),
    boardId: z.coerce.number().min(1),
    assigneeId: z.coerce.number().min(1),
    status: z.enum(["Backlog", "InProgress", "Done"]),
    priority: z.enum(["Low", "Medium", "High"]),
});

export type TaskRequestType = z.infer<typeof taskRequestSchema>;

export interface ITaskResponse {
    id: number;
    boardId: number;
    boardName: string;
    title: string;
    description: string;
    status: TStatus;
    priority: TPriority;
    assignee: IUser;
}

export interface IBoard {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}
