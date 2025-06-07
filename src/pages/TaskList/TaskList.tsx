import useTaskList from "./useTaskList.ts";
import Search from "../../widgets/Search/Search.tsx";
import FiltersForm from "../../widgets/FiltersForm/FiltersForm.tsx";
import Navbar from "../../widgets/Navbar/Navbar.tsx";
import styles from "./TaskList.module.scss";
import { Flex } from "@radix-ui/themes";
import Task from "../../shared/ui/Task/Task.tsx";

const TaskList = () => {
    const { data } = useTaskList();

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Flex justify="between">
                    <Search />
                    <FiltersForm />
                </Flex>
                <Flex direction="column" gap="3" mt="3">
                    {data.filteredTasks &&
                        data.filteredTasks.map((task) => (
                            <div key={task.id}>
                                <Task task={task} />
                            </div>
                        ))}
                </Flex>
            </div>
        </>
    );
};

export default TaskList;
