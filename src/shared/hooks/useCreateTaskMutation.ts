import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { TaskRequestType } from "../types.ts";
import { API_ENDPOINTS } from "../endpoints.ts";

interface useCreateTaskMutation {
    onSuccessCallback?: () => void;
}

/** Запрос на создание новой задачи
 * @param onSuccessCallback - функция, которая выполнится в случае успепха запроса */
export const useCreateTaskMutation = ({
    onSuccessCallback,
}: useCreateTaskMutation) => {
    return useMutation({
        mutationFn: (newTask: TaskRequestType) =>
            axios.post(API_ENDPOINTS.CREATE_TASK, newTask),
        onSuccess: (data) => {
            console.log(data);
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
