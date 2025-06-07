import useBoardList from "./useBoardList.ts";
import Navbar from "../../widgets/Navbar/Navbar.tsx";
import styles from "./BoardList.module.scss";
import { Flex } from "@radix-ui/themes";
import BoardCard from "../../shared/ui/BoardCard/BoardCard.tsx";

const BoardList = () => {
    const { data } = useBoardList();

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
