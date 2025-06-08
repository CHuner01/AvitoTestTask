import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
    type UseQueryResult,
} from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useBoard from "./useBoard";
import * as reactRouterDom from "react-router-dom";
import * as useBoardsHook from "../../shared/hooks/useBoards/useBoards";
import axios from "axios";
import type { IBoard } from "../../shared/types.ts";

vi.mock("axios");

vi.mock("react-router-dom", async () => {
    const actual =
        await vi.importActual<typeof reactRouterDom>("react-router-dom");
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

describe("useBoard hook", () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        queryClient.clear();
        (reactRouterDom.useParams as jest.Mock).mockReturnValue({ id: "2" });
    });

    it("Получение проекта из массива из useBoards по id", () => {
        vi.spyOn(useBoardsHook, "useBoards").mockReturnValue({
            data: [
                {
                    id: 1,
                    name: "Редизайн карточки товара",
                    description: "Обновление UI/UX основных страниц",
                    taskCount: 10,
                },
                {
                    id: 2,
                    name: "Оптимизация производительности",
                    description: "Улучшение Core Web Vitals",
                    taskCount: 6,
                },
            ],
        } as unknown as UseQueryResult<IBoard[], Error>);

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: [] } });

        const { result } = renderHook(() => useBoard(), { wrapper });

        expect(result.current.data.board).toEqual({
            id: 2,
            name: "Оптимизация производительности",
            description: "Улучшение Core Web Vitals",
            taskCount: 6,
        });
    });

    it("Запрос на получение задач проекта", async () => {
        vi.spyOn(reactRouterDom, "useParams").mockReturnValue({ id: "2" });
        vi.spyOn(useBoardsHook, "useBoards").mockReturnValue({
            data: [],
        } as unknown as UseQueryResult<IBoard[], Error>);

        const axiosGetMock = vi.spyOn(axios, "get").mockResolvedValueOnce({
            data: { data: [] },
        });

        const { result } = renderHook(() => useBoard(), { wrapper });

        await waitFor(() => expect(result.current.state.isLoading).toBe(false));

        expect(axiosGetMock).toHaveBeenCalledWith(
            expect.stringContaining("/2"),
            expect.any(Object),
        );
    });

    it("Получение списков задач по статусам", async () => {
        vi.spyOn(reactRouterDom, "useParams").mockReturnValue({ id: "1" });
        vi.spyOn(useBoardsHook, "useBoards").mockReturnValue({
            data: [
                {
                    id: 1,
                    name: "Редизайн карточки товара",
                    description: "Обновление UI/UX основных страниц",
                    taskCount: 10,
                },
                {
                    id: 2,
                    name: "Оптимизация производительности",
                    description: "Улучшение Core Web Vitals",
                    taskCount: 6,
                },
            ],
        } as unknown as UseQueryResult<IBoard[], Error>);

        const tasksMock = [
            { id: 1, status: "Backlog" },
            { id: 2, status: "InProgress" },
            { id: 3, status: "Done" },
            { id: 4, status: "Backlog" },
        ];

        vi.spyOn(axios, "get").mockResolvedValueOnce({
            data: { data: tasksMock },
        });

        const { result } = renderHook(() => useBoard(), { wrapper });

        await waitFor(() => expect(result.current.state.isLoading).toBe(false));

        expect(result.current.data.backlogTasks).toEqual([
            { id: 1, status: "Backlog" },
            { id: 4, status: "Backlog" },
        ]);
        expect(result.current.data.inProgressTasks).toEqual([
            { id: 2, status: "InProgress" },
        ]);
        expect(result.current.data.doneTasks).toEqual([
            { id: 3, status: "Done" },
        ]);
    });
});
