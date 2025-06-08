import { useBoards } from "../../shared/hooks/useBoards";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

/** Кастомный хук для получения всех проектов */
const useBoardList = () => {
    const { data: boards, isLoading, isError } = useBoards();
    const queryClient = useQueryClient();

    /**Прерывание запросов при размонтировании*/
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
