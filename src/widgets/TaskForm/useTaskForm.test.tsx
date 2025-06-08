import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useTaskForm from "./useTaskForm";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ITaskResponse, TaskRequestType } from "../../shared/types";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wrapperWithProviders =
    (route = "/board/1") =>
    ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/board/:id" element={children} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );

const LOCAL_STORAGE_KEY = "form-draft";
const delay = 300;

describe("useTaskForm", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("Сохранение формы в localStorage при создании задачи", async () => {
        const { result } = renderHook(
            () => useTaskForm({ isCreating: true, task: undefined }),
            {
                wrapper: wrapperWithProviders("/board/1"),
            },
        );

        const newTitle = "Новое название";

        act(() => {
            result.current.state.form.setValue("title", newTitle);
        });

        act(() => {
            vi.advanceTimersByTime(delay);
        });

        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        expect(stored).not.toBeNull();

        const parsed = JSON.parse(stored as string) as TaskRequestType;
        expect(parsed.title).toBe(newTitle);
    });

    it("Заполнение формы при открытии, используя reset", () => {
        const task: ITaskResponse = {
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
        };

        const { result } = renderHook(
            () => useTaskForm({ isCreating: false, task }),
            {
                wrapper: wrapperWithProviders("/board/1"),
            },
        );

        act(() => {
            result.current.state.setOpen(true);
        });

        const values = result.current.state.form.getValues();
        expect(values.title).toBe(task.title);
        expect(values.assigneeId).toBe(task.assignee.id);
        expect(values.boardId).toBe(1);
    });
});
