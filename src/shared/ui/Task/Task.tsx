import type { ITaskResponse } from "../../types.ts";
import TaskForm from "../../../widgets/TaskForm/TaskForm.tsx";
import { Flex, Separator, Text, Tooltip } from "@radix-ui/themes";
import styles from "./Task.module.scss";

interface TaskProps {
    task: ITaskResponse;
    direction?: "column" | "row";
}

const Task = ({ task, direction = "row" }: TaskProps) => {
    return (
        <Flex
            className={`${styles.container} ${direction === "row" ? styles.row : styles.column}`}
            justify="between"
            maxWidth={direction === "column" ? "320px" : "100%"}
        >
            <Flex
                direction="row"
                align="center"
                maxWidth="700px"
                minWidth="100px"
            >
                {task.title.length > 90 ? (
                    <Tooltip content={task.title}>
                        <Text truncate>{task.title}</Text>
                    </Tooltip>
                ) : (
                    <Text truncate>{task.title}</Text>
                )}
            </Flex>
            <Flex direction="row" gap="3" align="center" justify="between">
                <Flex gap="3" align="center" minWidth="100px">
                    <Text className={styles.text}>{task.status}</Text>
                    <Separator orientation="vertical" />
                    <Text className={styles.text}>{task.priority}</Text>
                    <Separator orientation="vertical" />
                    <Flex minWidth="50px" maxWidth="120px">
                        {task.assignee.fullName.length > 14 ? (
                            <Tooltip content={task.assignee.fullName}>
                                <Text className={styles.text} truncate>
                                    {task.assignee.fullName}
                                </Text>
                            </Tooltip>
                        ) : (
                            <Text className={styles.text} truncate>
                                {task.assignee.fullName}
                            </Text>
                        )}
                    </Flex>
                </Flex>
                <TaskForm isCreating={false} task={task} onBoard={false} />
            </Flex>
        </Flex>
    );
};

export default Task;
