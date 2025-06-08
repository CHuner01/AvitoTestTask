import useTaskList from "./useTaskList.ts";
import styles from "./TaskList.module.scss";
import { Flex } from "@radix-ui/themes";
import { LoadingPage } from "../../widgets/LoadingPage";
import { ErrorPage } from "../../widgets/ErrorPage";
import { Navbar } from "../../widgets/Navbar";
import { FiltersForm } from "../../widgets/FiltersForm";
import { Search } from "../../widgets/Search";
import { Task } from "../../widgets/Task";

const TaskList = () => {
    const { data, state } = useTaskList();

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
