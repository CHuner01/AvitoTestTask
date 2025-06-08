import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTaskList from "./useTaskList";
import * as reduxHooks from "../../shared/store/hooks/redux";
import axios from "axios";
import type { ITaskResponse } from "../../shared/types";
import type { RootState } from "../../shared/store/store.ts";

const mockTasks: ITaskResponse[] = [
    {
        id: 1,
        title: "Реализация новой галереи изображений",
        description:
            "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
        priority: "High",
        status: "Backlog",
        assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        boardId: 1,
        boardName: "Редизайн карточки товара",
    },
    {
        id: 2,
        title: "Адаптация карточки для мобильных устройств",
        description:
            "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
        priority: "Medium",
        status: "InProgress",
        assignee: {
            id: 3,
            fullName: "Александра Ветрова",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        boardId: 2,
        boardName: "Редизайн карточки товара",
    },
];

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useTaskList", () => {
    const queryClient = new QueryClient();

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        vi.resetAllMocks();

        vi.spyOn(reduxHooks, "useAppSelector").mockImplementation(
            (selector: (state: RootState) => unknown) =>
                selector({
                    filters: { status: [], boardId: [] },
                    searchReducer: { search: "" },
                } as RootState),
        );
    });

    afterEach(() => {
        queryClient.clear();
    });

    it("Получение задач с сервера", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: mockTasks },
        });

        const { result } = renderHook(() => useTaskList(), { wrapper });

        await waitFor(() => {
            expect(result.current.data.filteredTasks).toBeDefined();
        });

        expect(result.current.data.filteredTasks).toHaveLength(2);
        expect(result.current.state.isLoading).toBe(false);
    });

    it("Фильтрация задач по статусу", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: mockTasks },
        });

        vi.spyOn(reduxHooks, "useAppSelector").mockImplementation(
            (selector: (state: RootState) => unknown) =>
                selector({
                    filters: { status: ["Backlog"], boardId: [] },
                    searchReducer: { search: "" },
                } as RootState),
        );

        const { result } = renderHook(() => useTaskList(), { wrapper });

        await waitFor(() => {
            expect(result.current.data.filteredTasks).toBeDefined();
        });

        expect(result.current.data.filteredTasks).toHaveLength(1);
        expect(result.current.data.filteredTasks?.[0].status).toBe("Backlog");
    });

    it("Фильтрация задач по проекту", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: mockTasks },
        });

        vi.spyOn(reduxHooks, "useAppSelector").mockImplementation(
            (selector: (state: RootState) => unknown) =>
                selector({
                    filters: { status: [], boardId: [2] },
                    searchReducer: { search: "" },
                } as RootState),
        );

        const { result } = renderHook(() => useTaskList(), { wrapper });

        await waitFor(() => {
            expect(result.current.data.filteredTasks).toBeDefined();
        });

        expect(result.current.data.filteredTasks).toHaveLength(1);
        expect(result.current.data.filteredTasks?.[0].boardId).toBe(2);
    });

    it("Фильтрация задач по поиску (title и assignee)", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: mockTasks },
        });

        vi.spyOn(reduxHooks, "useAppSelector").mockImplementation(
            (selector: (state: RootState) => unknown) =>
                selector({
                    filters: { status: [], boardId: [] },
                    searchReducer: { search: "Илья Романов" },
                } as RootState),
        );

        const { result } = renderHook(() => useTaskList(), { wrapper });

        await waitFor(() => {
            expect(result.current.data.filteredTasks).toBeDefined();
        });

        expect(result.current.data.filteredTasks).toHaveLength(1);
        expect(result.current.data.filteredTasks?.[0].assignee.fullName).toBe(
            "Илья Романов",
        );
    });
});
