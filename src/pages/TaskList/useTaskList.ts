import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import axios from "axios";
import type { ITaskResponse } from "../../shared/types.ts";
import { useAppSelector } from "../../shared/store/hooks/redux.ts";

interface TaskListResponse {
    data: ITaskResponse[];
}

const useTaskList = () => {
    const getAllTasks = async () => {
        const response = await axios.get<TaskListResponse>(
            API_ENDPOINTS.GET_TASKS,
        );
        return response.data.data;
    };

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<ITaskResponse[]>({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
    });

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
    console.log(filteredTasks);

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
