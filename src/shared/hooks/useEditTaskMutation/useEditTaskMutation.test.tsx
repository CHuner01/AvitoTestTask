import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { vi } from "vitest";
import { useEditTaskMutation } from "./useEditTaskMutation";
import { API_ENDPOINTS } from "../../endpoints.ts";
import type { TPriority, TStatus } from "../../types.ts";

vi.mock("axios");

describe("useEditTaskMutation", () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Axios.put запрос с функцией onSuccessCallback", async () => {
        const onSuccessCallback = vi.fn();
        const taskId = 1;

        (axios.put as jest.Mock).mockResolvedValueOnce({
            data: { id: taskId },
        });

        const { result } = renderHook(
            () => useEditTaskMutation({ taskId, onSuccessCallback }),
            { wrapper },
        );

        const updatedTask = {
            title: "Обновленная задача",
            description: "Новое описание",
            priority: "Medium" as TPriority,
            status: "InProgress" as TStatus,
            assigneeId: 5,
            boardId: 1,
        };

        await act(async () => {
            await result.current.mutateAsync(updatedTask);
        });

        expect(axios.put).toHaveBeenCalledWith(
            `${API_ENDPOINTS.EDIT_TASK}/${taskId}`,
            updatedTask,
        );

        expect(onSuccessCallback).toHaveBeenCalled();
    });

    it("Вывод ошибки при неудачном запросе", async () => {
        const taskId = 2;
        const serverError = {
            response: {
                data: {
                    error: "ValidationError",
                    message: "Invalid task data",
                },
            },
        };
        (axios.put as jest.Mock).mockRejectedValueOnce(serverError);

        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        const { result } = renderHook(() => useEditTaskMutation({ taskId }), {
            wrapper,
        });

        const updatedTask = {
            title: "Обновленная задача",
            description: "Новое описание",
            priority: "Medium" as TPriority,
            status: "InProgress" as TStatus,
            assigneeId: 5,
            boardId: 1,
        };

        await act(async () => {
            try {
                await result.current.mutateAsync(updatedTask);
            } catch {
                //react query ловит ошибку
            }
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(serverError);

        consoleErrorSpy.mockRestore();
    });
});
