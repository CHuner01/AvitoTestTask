import axios from "axios";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ITaskResponse } from "../../shared/types.ts";
import { useParams } from "react-router-dom";
import { useBoards } from "../../shared/hooks/useBoards";
import { useEffect } from "react";

interface BoardTasksResponse {
    data: ITaskResponse[];
}

/** Кастомный хук для получения информации о проекте и его задачах */
const useBoard = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const { data: boards } = useBoards();

    /** Текущий проект, полученный по id */
    const board = boards?.find((board) => String(board.id) === id);

    /** Запрос на получение задач текущего проекта */
    const getBoardTasks = async ({ signal }: { signal?: AbortSignal }) => {
        const response = await axios.get<BoardTasksResponse>(
            `${API_ENDPOINTS.GET_BOARD_TASKS}/${id}`,
            { signal },
        );
        return response.data.data;
    };

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<ITaskResponse[]>({
        queryKey: ["boardTasks", id],
        queryFn: ({ signal }) => getBoardTasks({ signal }),
    });

    /**Прерывание запросов при размонтировании*/
    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ["boards"] });
            queryClient.cancelQueries({ queryKey: ["boardTasks"] });
        };
    }, [queryClient]);

    /** Задачи с статусом Backlog */
    const backlogTasks = tasks?.filter((task) => task.status === "Backlog");
    /** Задачи с статусом InProgress */
    const inProgressTasks = tasks?.filter(
        (task) => task.status === "InProgress",
    );
    /** Задачи с статусом Done */
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
