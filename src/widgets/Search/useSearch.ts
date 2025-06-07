import { useEffect, useState } from "react";
import { useAppDispatch } from "../../shared/store/hooks/redux.ts";
import { setSearch } from "../../shared/store/slices/searchSlice.ts";

const delay = 300;

const useSearch = () => {
    const [searchText, setSearchText] = useState("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setSearch(searchText));
            console.log(searchText);
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
