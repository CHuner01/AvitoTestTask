import { useBoards } from "../../shared/hooks/useBoards.ts";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useBoardList = () => {
    const { data: boards, isLoading, isError } = useBoards();
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ["boards"] });
        };
    }, [queryClient]);

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
