import { useEffect, useState } from "react";
import { useAppDispatch } from "../../shared/store/hooks/redux.ts";
import { setSearch } from "../../shared/store/slices/searchSlice.ts";

/** Задержка, после которой текст запишется в стор */
const delay = 300;

/** Кастомный хук для отслеживания поля ввода поиска */
const useSearch = () => {
    const [searchText, setSearchText] = useState("");

    const dispatch = useAppDispatch();

    /** При вводе, текст запишется в стор после задержки */
    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setSearch(searchText));
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText, dispatch]);

    return {
        searchText,
        setSearchText,
    };
};

export default useSearch;
