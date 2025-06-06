type TStatus = "Low" | "Medium" | "High";
type TPriority = "Backlog" | "InProgress" | "Done";

export interface IAssignee {
    id: number;
    email: string;
    fullName: string;
    avatarUrl: string;
}

export interface ITaskResponse {
    id: string;
    boardId: number;
    boardName: string;
    title: string;
    description: string;
    status: TStatus;
    priority: TPriority;
    assignee: IAssignee;
}

export interface IBoard {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}
