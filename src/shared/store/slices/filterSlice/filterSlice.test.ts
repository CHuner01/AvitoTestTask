import reducer, { setFilters } from "./filtersSlice.ts";
import type { IFilters } from "../../../types.ts";

describe("filtersSlice", () => {
    const initialState: IFilters = {
        status: [],
        boardId: [],
    };

    it("Должен возвращать начальное состояние", () => {
        expect(reducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual(
            initialState,
        );
    });

    it("Должен установить новые фильтры", () => {
        const newState = reducer(
            initialState,
            setFilters({
                status: ["Backlog"],
                boardId: [1],
            }),
        );

        expect(newState.status).toEqual(["Backlog"]);
        expect(newState.boardId).toEqual([1]);
    });
});
