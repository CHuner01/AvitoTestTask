import axios from "axios";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import type { ITaskResponse } from "../../shared/types.ts";
import { useParams } from "react-router-dom";
import { useBoards } from "../../shared/hooks/useBoards.ts";

interface BoardTasksResponse {
    data: ITaskResponse[];
}

const useBoard = () => {
    const { id } = useParams<{ id: string }>();

    const { data: boards } = useBoards();

    const board = boards?.find((board) => String(board.id) === id);

    const getBoardTasks = async () => {
        const response = await axios.get<BoardTasksResponse>(
            `${API_ENDPOINTS.GET_BOARD_TASKS}/${id}`,
        );
        return response.data.data;
    };

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<ITaskResponse[]>({
        queryKey: ["boardTasks", id],
        queryFn: getBoardTasks,
    });

    const backlogTasks = tasks?.filter((task) => task.status === "Backlog");
    const inProgressTasks = tasks?.filter(
        (task) => task.status === "InProgress",
    );
    const doneTasks = tasks?.filter((task) => task.status === "Done");

    return {
        data: {
            id,
            board,
            backlogTasks,
            inProgressTasks,
            doneTasks,
        },
        state: {
            isLoading,
            isError,
        },
    };
};

export default useBoard;
