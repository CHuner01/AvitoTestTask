import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TaskRequestType } from "../types.ts";
import { API_ENDPOINTS } from "../endpoints.ts";

interface useEditTaskMutationProps {
    onSuccessCallback?: () => void;
    taskId: number | undefined;
}

export const useEditTaskMutation = ({
    taskId,
    onSuccessCallback,
}: useEditTaskMutationProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTask: TaskRequestType) =>
            axios.put(`${API_ENDPOINTS.EDIT_TASK}/${taskId}`, newTask),
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
