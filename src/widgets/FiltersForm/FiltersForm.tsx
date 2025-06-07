import {
    Box,
    Button,
    Flex,
    Popover,
    Text,
    CheckboxGroup,
} from "@radix-ui/themes";
import useFiltersForm from "./useFiltersForm.ts";
import { Controller, FormProvider } from "react-hook-form";

const FiltersForm = () => {
    const { data, state } = useFiltersForm();

    return (
        <FormProvider {...state.form}>
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant="soft">Фильтры</Button>
                </Popover.Trigger>
                <Popover.Content width="360px">
                    <Flex>
                        <Box flexGrow="1">
                            <Text as="div" size="3" mb="1" weight="bold">
                                Фильтры
                            </Text>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Статус
                            </Text>
                            <Controller
                                name="status"
                                control={state.form.control}
                                render={({ field }) => (
                                    <CheckboxGroup.Root
                                        value={field.value || []}
                                        onValueChange={field.onChange}
                                    >
                                        {data.statuses.map((status) => (
                                            <div key={status}>
                                                <CheckboxGroup.Item
                                                    value={status}
                                                >
                                                    {status}
                                                </CheckboxGroup.Item>
                                            </div>
                                        ))}
                                    </CheckboxGroup.Root>
                                )}
                            />

                            <Text as="div" size="2" mt="3" mb="1" weight="bold">
                                Проекты
                            </Text>
                            <Controller
                                name="boardId"
                                control={state.form.control}
                                render={({ field }) => {
                                    const stringValue = (field.value || []).map(
                                        String,
                                    );
                                    return (
                                        <CheckboxGroup.Root
                                            value={stringValue}
                                            onValueChange={(
                                                values: string[],
                                            ) => {
                                                const numberValues =
                                                    values.map(Number);
                                                field.onChange(numberValues);
                                            }}
                                        >
                                            {data.boards?.map((board) => (
                                                <div key={board.id}>
                                                    <CheckboxGroup.Item
                                                        value={String(board.id)}
                                                    >
                                                        {board.name}
                                                    </CheckboxGroup.Item>
                                                </div>
                                            ))}
                                        </CheckboxGroup.Root>
                                    );
                                }}
                            />
                        </Box>
                    </Flex>
                </Popover.Content>
            </Popover.Root>
        </FormProvider>
    );
};

export default FiltersForm;
