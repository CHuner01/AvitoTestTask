import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TaskRequestType } from "../types.ts";
import { API_ENDPOINTS } from "../endpoints.ts";

interface useCreateTaskMutation {
    onSuccessCallback?: () => void;
}

export const useCreateTaskMutation = ({
    onSuccessCallback,
}: useCreateTaskMutation) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTask: TaskRequestType) =>
            axios.post(API_ENDPOINTS.CREATE_TASK, newTask),
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
