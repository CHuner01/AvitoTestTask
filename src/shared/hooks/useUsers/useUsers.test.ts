import { vi, describe, it, expect } from "vitest";
import axios from "axios";
import { API_ENDPOINTS } from "../../endpoints.ts";
import type { UserListResponse } from "./types.ts";
import { getUsers } from "./useUsers.ts";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getUsers", () => {
    it("Get запрос по правильному URL и получение данных", async () => {
        const mockResponse: UserListResponse = {
            data: [
                {
                    id: 2,
                    fullName: "Илья Романов",
                    email: "il.romanov@avito.ru",
                    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                },
            ],
        };

        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const result = await getUsers({});

        expect(mockedAxios.get).toHaveBeenCalledWith(API_ENDPOINTS.GET_USERS, {
            signal: undefined,
        });
        expect(result).toEqual(mockResponse.data);
    });
});
