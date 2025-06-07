import { useForm } from "react-hook-form";
import { useBoards } from "../../shared/hooks/useBoards.ts";
import { type IFilters, statuses } from "../../shared/types.ts";
import { useAppDispatch } from "../../shared/store/hooks/redux.ts";
import { useEffect } from "react";
import { setFilters } from "../../shared/store/slices/filtersSlice.ts";

const FormDefaultValues: IFilters = {
    status: [],
    boardId: [],
};

const useFiltersForm = () => {
    const form = useForm({
        defaultValues: FormDefaultValues,
    });
    const { watch } = form;
    const formValues: IFilters = watch();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setFilters(formValues));
    }, [formValues, dispatch]);

    const { data: boards } = useBoards();

    return {
        data: {
            boards,
            statuses,
        },
        state: {
            form,
        },
    };
};

export default useFiltersForm;
