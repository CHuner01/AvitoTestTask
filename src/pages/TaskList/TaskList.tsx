import useTaskList from "./useTaskList.ts";

const TaskList = () => {
    const { data } = useTaskList();

    return <>{data.tasks?.map((task) => <p key={task.id}>{task.title}</p>)}</>;
};

export default TaskList;
