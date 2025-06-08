import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { vi } from "vitest";
import { useCreateTaskMutation } from "./useCreateTaskMutation";
import { API_ENDPOINTS } from "../../endpoints.ts";
import type { TPriority, TStatus } from "../../types.ts";

vi.mock("axios");

describe("useCreateTaskMutation", () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Axios.post запрос с функцией onSuccessCallback", async () => {
        const onSuccessCallback = vi.fn();

        (axios.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1 } });

        const { result } = renderHook(
            () => useCreateTaskMutation({ onSuccessCallback }),
            {
                wrapper,
            },
        );

        await act(async () => {
            await result.current.mutateAsync({
                title: "Новая задача",
                description: "Описание",
                priority: "High",
                status: "Backlog",
                assigneeId: 1,
                boardId: 1,
            });
        });

        expect(axios.post).toHaveBeenCalledWith(API_ENDPOINTS.CREATE_TASK, {
            title: "Новая задача",
            description: "Описание",
            priority: "High",
            status: "Backlog",
            assigneeId: 1,
            boardId: 1,
        });

        expect(onSuccessCallback).toHaveBeenCalled();
    });

    it("Вывод ошибки при неудачном запросе", async () => {
        const serverError = {
            response: {
                data: {
                    error: "ValidationError",
                    message: "Некорректные данные задачи",
                },
            },
        };
        (axios.post as jest.Mock).mockRejectedValueOnce(serverError);

        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        const { result } = renderHook(() => useCreateTaskMutation({}), {
            wrapper,
        });

        const newTask = {
            title: "Новая задача",
            description: "Описание",
            priority: "High" as TPriority,
            status: "Backlog" as TStatus,
            assigneeId: 1,
            boardId: 1,
        };

        await act(async () => {
            try {
                await result.current.mutateAsync(newTask);
            } catch {
                // react-query ловит ошибку
            }
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(serverError);

        consoleErrorSpy.mockRestore();
    });
});
