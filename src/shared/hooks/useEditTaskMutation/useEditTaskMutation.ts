import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { TaskRequestType } from "../../types.ts";
import { API_ENDPOINTS } from "../../endpoints.ts";

interface useEditTaskMutationProps {
    onSuccessCallback?: () => void;
    taskId: number | undefined;
}

/** Запрос на изменение задачи
 * @param taskId - id задачи для изменения
 * @param onSuccessCallback - функция, которая выполнится в случае успепха запроса
 *  */
export const useEditTaskMutation = ({
    taskId,
    onSuccessCallback,
}: useEditTaskMutationProps) => {
    return useMutation({
        mutationFn: (newTask: TaskRequestType) =>
            axios.put(`${API_ENDPOINTS.EDIT_TASK}/${taskId}`, newTask),
        onSuccess: (data) => {
            console.log(data);
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
