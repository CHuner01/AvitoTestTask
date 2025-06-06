import axios from "axios";
import type { IBoard } from "../../shared/types.ts";
import { API_ENDPOINTS } from "../../shared/endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../shared/store/hooks/redux.ts";
import { useEffect } from "react";
import { setBoards } from "../../shared/store/slices/boardsSlice.ts";

interface BoardListResponse {
    data: IBoard[];
}

const useBoardList = () => {
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

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setBoards(boards ?? []));
    }, [dispatch, boards]);

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

export default useBoardList;
