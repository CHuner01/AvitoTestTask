import axios from "axios";
import { API_ENDPOINTS } from "../endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import type { IBoard } from "../types.ts";

interface BoardListResponse {
    data: IBoard[];
}

const getBoards = async () => {
    const response = await axios.get<BoardListResponse>(
        API_ENDPOINTS.GET_BOARDS,
    );
    console.log(response.data.data);
    return response.data.data;
};

export const useBoards = () => {
    return useQuery<IBoard[]>({
        queryKey: ["boards"],
        queryFn: getBoards,
    });
};
