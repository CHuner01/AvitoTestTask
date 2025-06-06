import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import axios from "axios";
import type { ITaskResponse } from "../../shared/types.ts";

interface TaskListResponse {
    data: ITaskResponse[];
}

const UseTaskList = () => {
    const getTasks = async () => {
        const response = await axios.get<TaskListResponse>(
            API_ENDPOINTS.GET_TASKS,
        );
        console.log(response.data.data);
        return response.data.data;
    };

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<ITaskResponse[]>({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    return {
        data: {
            tasks,
        },
        state: {
            isLoading,
            isError,
        },
    };
};

export default UseTaskList;
