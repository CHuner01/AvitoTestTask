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
import { useUsers } from "../../shared/hooks/useUsers/useUsers.ts";
import { useCreateTaskMutation } from "../../shared/hooks/useCreateTaskMutation/useCreateTaskMutation.ts";
import { useEditTaskMutation } from "../../shared/hooks/useEditTaskMutation/useEditTaskMutation.ts";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useBoards } from "../../shared/hooks/useBoards/useBoards.ts";

/** Ключ, под которым сохраняется чреновик в local storage */
const LOCAL_STORAGE_KEY = "form-draft";
/** Задержка перед сохранением черновика формы */
const delay = 300;

/** Кастомный хук для создания формы для создания или изменения задач  */
const useTaskForm = ({ isCreating, task }: TaskFormProps) => {
    const [open, setOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    /** Переменная, показывающая, что форма находится на странице проекта */
    const onBoard = !!id;
    const draftFromStorage = isCreating
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null")
        : null;

    /** Для значения по умолчанию берется черновик из local storage, если черновика нет, берется пустые поля  */
    const FormDefaultValues: TaskRequestType = draftFromStorage || {
        title: "",
        description: "",
        boardId: onBoard ? Number(id) : (task?.boardId ?? 0),
        assigneeId: 0,
        status: "Backlog",
        priority: "Low",
    };

    /** Форма для создания или редактирования задач, которая использует zod схему для валидации полей */
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

    const formValues: TaskRequestType = form.watch();

    /** При изменении полей, после задержки, введенные поля запишутся в local storage */
    useEffect(() => {
        if (!isCreating) return;

        const handler = setTimeout(() => {
            console.log(formValues);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValues));
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [formValues, isCreating]);

    /** При открытии формы, поля обнуляются к значениям по умолчанию */
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
            /** При успешном создании задачи, удаляем черновик */
            localStorage.removeItem(LOCAL_STORAGE_KEY);
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

    /**Прерывание запросов при размонтировании*/
    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ["boards"] });
            queryClient.cancelQueries({ queryKey: ["users"] });
        };
    }, [queryClient]);

    /** Переменная, показывающая состояние запроса */
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
            /** Функция для удланеия черновика при нажатии на кнопку Отмена */
            cancelFunction: () => localStorage.removeItem(LOCAL_STORAGE_KEY),
        },
    };
};

export default useTaskForm;
