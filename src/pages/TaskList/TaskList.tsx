import useTaskList from "./useTaskList.ts";
import TaskForm from "../../widgets/TaskForm/TaskForm.tsx";

const TaskList = () => {
    const { data } = useTaskList();

    return (
        <>
            <TaskForm isCreating={true} />
            {data.filteredTasks &&
                data.filteredTasks.map((task) => (
                    <div key={task.id}>
                        <TaskForm
                            isCreating={false}
                            task={task}
                            onBoard={false}
                        />
                        <p>{task.title}</p>
                        <p>{task.status}</p>
                        <p>{task.priority}</p>
                    </div>
                ))}
        </>
    );
};

export default TaskList;
