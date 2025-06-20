import type { ITaskResponse } from "../../shared/types.ts";
import { Flex, Separator, Text, Tooltip } from "@radix-ui/themes";
import styles from "./Task.module.scss";
import { TaskForm } from "../TaskForm";

interface TaskProps {
    /** Данные задачи */
    task: ITaskResponse;
    /** Расположение информации строкой или столбцом */
    direction?: "column" | "row";
}

/** Карточка задачи с краткой инфомарцией по задаче и формой изменения задачи */
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
                <Tooltip content={task.title}>
                    <Text truncate>{task.title}</Text>
                </Tooltip>
            </Flex>
            <Flex direction="row" gap="3" align="center" justify="between">
                <Flex gap="3" align="center" minWidth="100px">
                    <Text className={styles.text}>{task.status}</Text>
                    <Separator orientation="vertical" />
                    <Text className={styles.text}>{task.priority}</Text>
                    <Separator orientation="vertical" />
                    <Flex minWidth="50px" maxWidth="120px">
                        <Tooltip content={task.assignee.fullName}>
                            <Text className={styles.text} truncate>
                                {task.assignee.fullName}
                            </Text>
                        </Tooltip>
                    </Flex>
                </Flex>
                <TaskForm isCreating={false} task={task} />
            </Flex>
        </Flex>
    );
};

export default Task;
