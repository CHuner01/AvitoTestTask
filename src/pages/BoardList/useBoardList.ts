import axios from "axios";
import type { IBoard } from "../../shared/types.ts";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import { useQuery } from "@tanstack/react-query";

interface BoardListResponse {
    data: IBoard[];
}

const UseBoardList = () => {
    const getBoards = async () => {
        const response = await axios.get<BoardListResponse>(
            API_ENDPOINTS.GET_BOARDS,
        );
        console.log(response.data.data);
        return response.data.data;
    };

    const {
        data: boards,
        isLoading,
        isError,
    } = useQuery<IBoard[]>({
        queryKey: ["boards"],
        queryFn: getBoards,
    });

    return {
        data: {
            boards,
        },
        state: {
            isLoading,
            isError,
        },
    };
};

export default UseBoardList;
