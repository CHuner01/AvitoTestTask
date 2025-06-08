import { vi, describe, it, expect } from "vitest";
import axios from "axios";
import { API_ENDPOINTS } from "../../endpoints.ts";
import { getBoards } from "./useBoards";
import type { BoardListResponse } from "./types.ts";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getBoards", () => {
    it("Get запрос по правильному URL и получение данных", async () => {
        const mockResponse: BoardListResponse = {
            data: [
                {
                    id: 1,
                    name: "Реализация",
                    description: "Работа",
                    taskCount: 1,
                },
            ],
        };

        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const result = await getBoards({});

        expect(mockedAxios.get).toHaveBeenCalledWith(API_ENDPOINTS.GET_BOARDS, {
            signal: undefined,
        });
        expect(result).toEqual(mockResponse.data);
    });
});
