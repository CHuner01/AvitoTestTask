import axios from "axios";
import { API_ENDPOINTS } from "../endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import type { IBoard } from "../types.ts";

interface BoardListResponse {
    data: IBoard[];
}

/** Запрос на получение всех проектов */
const getBoards = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axios.get<BoardListResponse>(
        API_ENDPOINTS.GET_BOARDS,
        { signal },
    );
    return response.data.data;
};

export const useBoards = () => {
    return useQuery<IBoard[]>({
        queryKey: ["boards"],
        queryFn: ({ signal }) => getBoards({ signal }),
    });
};
