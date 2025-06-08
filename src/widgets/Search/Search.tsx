import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useSearch from "./useSearch.ts";

/** Поле для ввода текста поиска */
const Search = () => {
    const { searchText, setSearchText } = useSearch();

    return (
        <>
            <TextField.Root
                placeholder="Поиск"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            >
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
        </>
    );
};

export default Search;
