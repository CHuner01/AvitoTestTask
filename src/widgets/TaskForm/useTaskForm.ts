import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    priorities,
    statuses,
    taskRequestSchema,
    type TaskRequestType,
} from "../../shared/types.ts";
import type { TaskFormProps } from "./types.ts";
import { useUsers } from "../../shared/hooks/useUsers.ts";
import { useBoards } from "../../shared/hooks/useBoards.ts";
import { useCreateTaskMutation } from "../../shared/hooks/useCreateTaskMutation.ts";
import { useEditTaskMutation } from "../../shared/hooks/useEditTaskMutation.ts";

const FormDefaultValues: TaskRequestType = {
    title: "",
    description: "",
    boardId: 0,
    assigneeId: 0,
    status: "Backlog",
    priority: "Low",
};

const useTaskForm = ({ isCreating, task }: TaskFormProps) => {
    const [open, setOpen] = useState(false);

    const form = useForm<TaskRequestType>({
        resolver: zodResolver(taskRequestSchema),
        mode: "onChange",
        defaultValues: isCreating
            ? FormDefaultValues
            : {
                  ...task,
                  assigneeId: task?.assignee.id,
              },
    });

    useEffect(() => {
        if (!isCreating && task) {
            form.reset({
                ...task,
                assigneeId: task.assignee.id,
            });
        } else {
            form.reset(FormDefaultValues);
        }
    }, [open, isCreating, task, form]);

    const createTaskMutation = useCreateTaskMutation({
        onSuccessCallback: () => setOpen(false),
    });
    const editTaskMutation = useEditTaskMutation({
        onSuccessCallback: () => {
            setOpen(false);
        },
        taskId: task?.id,
    });

    const onSubmit = (data: TaskRequestType) => {
        console.log(data);
        (isCreating ? createTaskMutation : editTaskMutation).mutate(data);
    };

    const { data: users } = useUsers();
    const { data: boards } = useBoards();

    return {
        data: {
            boards,
            users,
            statuses,
            priorities,
        },
        state: {
            form,
            open,
            setOpen,
        },
        functions: {
            onSubmit,
        },
    };
};

export default useTaskForm;
