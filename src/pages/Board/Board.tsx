import useBoard from "./useBoard.ts";
import Navbar from "../../widgets/Navbar/Navbar.tsx";
import styles from "./Board.module.scss";
import { Flex, Text } from "@radix-ui/themes";
import Task from "../../shared/ui/Task/Task.tsx";
import LoadingPage from "../../widgets/LoadingPage/LoadingPage.tsx";
import ErrorPage from "../../widgets/ErrorPage/ErrorPage.tsx";

const Board = () => {
    const { data, state } = useBoard();

    if (state.isLoading) {
        return <LoadingPage />;
    }

    if (state.isError) {
        return <ErrorPage />;
    }

    if (!data.board) {
        return (
            <>
                <Navbar />
                <div className={styles.center}>
                    <Text size="4">Кажется, такого проекта нет</Text>
                </div>
            </>
        );
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
                            <div key={task.id}>
                                <Task task={task} direction="column" />
                            </div>
                        ))}
                    </Flex>
                    <Flex direction="column" gap="4">
                        <Text size="3" weight="bold">
                            In Progress
                        </Text>
                        {data.inProgressTasks?.map((task) => (
                            <div key={task.id}>
                                <Task task={task} direction="column" />
                            </div>
                        ))}
                    </Flex>
                    <Flex direction="column" gap="4">
                        <Text size="3" weight="bold">
                            Done
                        </Text>
                        {data.doneTasks?.map((task) => (
                            <div key={task.id}>
                                <Task task={task} direction="column" />
                            </div>
                        ))}
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default Board;
