import axios from "axios";
import { API_ENDPOINTS } from "../endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../types.ts";

interface UserListResponse {
    data: IUser[];
}

const getUsers = async () => {
    const response = await axios.get<UserListResponse>(API_ENDPOINTS.GET_USERS);
    return response.data.data;
};

export const useUsers = () => {
    return useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};
