import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import axios from "axios";
import type { ITaskResponse, IUser } from "../../shared/types.ts";
import {
    useAppDispatch,
    useAppSelector,
} from "../../shared/store/hooks/redux.ts";
import { useEffect } from "react";
import { setUsers } from "../../shared/store/slices/usersSlice.ts";

interface TaskListResponse {
    data: ITaskResponse[];
}

interface UserListResponse {
    data: IUser[];
}

const useTaskList = () => {
    const getAllTasks = async () => {
        const response = await axios.get<TaskListResponse>(
            API_ENDPOINTS.GET_TASKS,
        );
        console.log(response.data.data);
        return response.data.data;
    };

    const getUsers = async () => {
        const response = await axios.get<UserListResponse>(
            API_ENDPOINTS.GET_USERS,
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
        queryFn: getAllTasks,
    });

    const filters = useAppSelector((state) => state.filters);

    const isSetSearch = filters.search.trim().length > 0;

    const filteredTasks = tasks?.filter(
        (task) =>
            filters.status.includes(task.status) &&
            filters.boardId.includes(task.boardId) &&
            (!isSetSearch ||
                task.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase()) ||
                task.assignee.fullName
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())),
    );

    const { data: users } = useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUsers(users ?? []));
    }, [dispatch, users]);

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
