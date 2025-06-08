import reducer, { setSearch } from "./searchSlice.ts";
import type { searchInitialState } from "./types.ts";

describe("searchSlice", () => {
    const initialState: searchInitialState = {
        search: "",
    };

    it("Должен возвращать начальное состояние", () => {
        expect(reducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual(
            initialState,
        );
    });

    it("Должен установить новый параметр поиска", () => {
        const newState = reducer(initialState, setSearch("реализация"));

        expect(newState.search).toEqual("реализация");
    });
});
