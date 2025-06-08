import axios from "axios";
import { API_ENDPOINTS } from "../endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../types.ts";

interface UserListResponse {
    data: IUser[];
}

const getUsers = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axios.get<UserListResponse>(
        API_ENDPOINTS.GET_USERS,
        { signal },
    );
    return response.data.data;
};

export const useUsers = () => {
    return useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: ({ signal }) => getUsers({ signal }),
    });
};
