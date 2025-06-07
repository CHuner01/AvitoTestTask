import useBoard from "./useBoard.ts";
import Navbar from "../../widgets/Navbar/Navbar.tsx";
import styles from "./Board.module.scss";
import { Flex, Text } from "@radix-ui/themes";
import Task from "../../shared/ui/Task/Task.tsx";

const Board = () => {
    const { data, state } = useBoard();

    if (state.isError) {
        return <p>Ошибка</p>;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Text size="4" weight="bold">
                    Проект: {data.board?.name}
                </Text>
                <div className={styles.board}>
                    <Flex direction="column" gap="4">
                        <Text size="3" weight="bold">
                            Backlog
                        </Text>
                        {data.backlogTasks?.map((task) => (
                            <Task task={task} direction="column" />
                        ))}
                    </Flex>
                    <Flex direction="column" gap="4">
                        <Text size="3" weight="bold">
                            In Progress
                        </Text>
                        {data.inProgressTasks?.map((task) => (
                            <Task task={task} direction="column" />
                        ))}
                    </Flex>
                    <Flex direction="column" gap="4">
                        <Text size="3" weight="bold">
                            Done
                        </Text>
                        {data.doneTasks?.map((task) => (
                            <Task task={task} direction="column" />
                        ))}
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default Board;
