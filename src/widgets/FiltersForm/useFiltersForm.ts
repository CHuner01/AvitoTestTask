import { useForm } from "react-hook-form";
import { useBoards } from "../../shared/hooks/useBoards.ts";
import { type IFilters, statuses } from "../../shared/types.ts";
import { useAppDispatch } from "../../shared/store/hooks/redux.ts";
import { useEffect } from "react";
import { setFilters } from "../../shared/store/slices/filtersSlice.ts";
import { useQueryClient } from "@tanstack/react-query";

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

    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ["boards"] });
        };
    }, [queryClient]);

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
