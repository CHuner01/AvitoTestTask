import { z } from "zod";

/** Типы статусов */
export type TStatus = "Backlog" | "InProgress" | "Done";
/** Типы приоритетов */
export type TPriority = "Low" | "Medium" | "High";

export const statuses = ["Backlog", "InProgress", "Done"];
export const priorities = ["Low", "Medium", "High"];

/** Интерфейс пользователя */
export interface IUser {
    id: number;
    email: string;
    fullName: string;
    avatarUrl: string;
}
/** Zod схема для создания или редактирования задачи */
export const taskRequestSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Обязательное поле")
        .max(100, "Максимум 100 символов"),
    description: z
        .string()
        .trim()
        .min(1, "Обязательное поле")
        .max(255, "Максимум 255 символов"),
    boardId: z.coerce.number().min(1, "Обязательное поле"),
    assigneeId: z.coerce.number().min(1, "Обязательное поле"),
    status: z.enum(["Backlog", "InProgress", "Done"]),
    priority: z.enum(["Low", "Medium", "High"]),
});
/** Тип для создания или редактирования задачи */
export type TaskRequestType = z.infer<typeof taskRequestSchema>;

/** Интерфейс задачи, полученной с сервера */
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

/** Интерфейс проекта */
export interface IBoard {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}
/** Интерфейс параметров фильтров */
export interface IFilters {
    status: TStatus[];
    boardId: number[];
}
