import { useBoards } from "../../shared/hooks/useBoards.ts";

const useBoardList = () => {
    const { data: boards, isLoading, isError } = useBoards();

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
