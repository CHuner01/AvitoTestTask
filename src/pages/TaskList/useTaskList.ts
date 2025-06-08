import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import axios from "axios";
import type { ITaskResponse } from "../../shared/types.ts";
import { useAppSelector } from "../../shared/store/hooks/redux.ts";
import { useEffect } from "react";

interface TaskListResponse {
    data: ITaskResponse[];
}

const useTaskList = () => {
    const getAllTasks = async ({ signal }: { signal?: AbortSignal }) => {
        const response = await axios.get<TaskListResponse>(
            API_ENDPOINTS.GET_TASKS,
            { signal },
        );
        return response.data.data;
    };

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<ITaskResponse[]>({
        queryKey: ["tasks"],
        queryFn: ({ signal }) => getAllTasks({ signal }),
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ["tasks"] });
        };
    }, [queryClient]);

    const filters = useAppSelector((state) => state.filters);
    const search = useAppSelector((state) => state.searchReducer.search);

    const isSetSearch = search.trim().length > 0;

    const filteredTasks = tasks?.filter(
        (task) =>
            (filters.status.length === 0 ||
                filters.status.includes(task.status)) &&
            (filters.boardId.length === 0 ||
                filters.boardId.includes(task.boardId)) &&
            (!isSetSearch ||
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.assignee.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())),
    );

    return {
        data: {
            filteredTasks,
        },
        state: {
            isLoading,
            isError,
        },
    };
};

export default useTaskList;
