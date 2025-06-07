import useBoardList from "./useBoardList.ts";
import Navbar from "../../widgets/Navbar/Navbar.tsx";
import styles from "./BoardList.module.scss";
import { Flex } from "@radix-ui/themes";
import BoardCard from "../../shared/ui/BoardCard/BoardCard.tsx";
import ErrorPage from "../../widgets/ErrorPage/ErrorPage.tsx";
import LoadingPage from "../../widgets/LoadingPage/LoadingPage.tsx";

const BoardList = () => {
    const { data, state } = useBoardList();

    if (state.isLoading) {
        return <LoadingPage />;
    }

    if (state.isError) {
        return <ErrorPage />;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Flex direction="column" gap="3" mt="3">
                    {data.boards?.map((board) => (
                        <div key={board.id}>
                            <BoardCard board={board} />
                        </div>
                    ))}
                </Flex>
            </div>
        </>
    );
};

export default BoardList;
