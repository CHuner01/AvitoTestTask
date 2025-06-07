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
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useTaskForm = ({ isCreating, task }: TaskFormProps) => {
    const [open, setOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const onBoard = !!id;

    const FormDefaultValues: TaskRequestType = {
        title: "",
        description: "",
        boardId: onBoard ? Number(id) : task?.boardId ? task?.boardId : 0,
        assigneeId: 0,
        status: "Backlog",
        priority: "Low",
    };

    const form = useForm<TaskRequestType>({
        resolver: zodResolver(taskRequestSchema),
        mode: "onChange",
        defaultValues: isCreating
            ? FormDefaultValues
            : {
                  ...task,
                  assigneeId: task?.assignee.id,
                  boardId: onBoard
                      ? Number(id)
                      : task?.boardId
                        ? task?.boardId
                        : 0,
              },
    });

    useEffect(() => {
        if (!isCreating && task) {
            form.reset({
                ...task,
                assigneeId: task.assignee.id,
                boardId: onBoard
                    ? Number(id)
                    : task?.boardId
                      ? task?.boardId
                      : 0,
            });
        } else {
            form.reset(FormDefaultValues);
        }
    }, [open, isCreating, task, form]);

    const createTaskMutation = useCreateTaskMutation({
        onSuccessCallback: () => {
            queryClient.invalidateQueries({
                queryKey: [onBoard ? "boardTasks" : "tasks"],
            });
            setOpen(false);
        },
    });
    const editTaskMutation = useEditTaskMutation({
        onSuccessCallback: () => {
            queryClient.invalidateQueries({
                queryKey: [onBoard ? "boardTasks" : "tasks"],
            });
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

    const isPending: boolean = isCreating
        ? createTaskMutation.isPending
        : editTaskMutation.isPending;

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
            isPending,
            onBoard,
        },
        functions: {
            onSubmit,
        },
    };
};

export default useTaskForm;
