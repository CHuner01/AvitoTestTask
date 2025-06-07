import { Button, Dialog, Flex, TextField, TextArea } from "@radix-ui/themes";
import useTaskForm from "./useTaskForm.ts";
import { FormProvider } from "react-hook-form";
import BoardSelect from "../../shared/ui/BoardSelect/BoardSelect.tsx";
import AssigneeSelect from "../../shared/ui/AssigneeSelect/AssigneeSelect.tsx";
import Select from "../../shared/ui/Select/Select.tsx";
import type { TaskFormProps } from "./types.ts";
import Label from "../../shared/ui/Label/Label.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes.ts";

const TaskForm = ({ isCreating, task, onBoard }: TaskFormProps) => {
    const navigate = useNavigate();
    const { data, state, functions } = useTaskForm({
        isCreating,
        task,
    });

    return (
        <FormProvider {...state.form}>
            <Dialog.Root
                open={state.open}
                onOpenChange={(open) => {
                    state.setOpen(open);
                }}
            >
                <Dialog.Trigger>
                    <Button>
                        {isCreating ? "Создать задачу" : "Редактировать"}
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <form
                        onSubmit={state.form.handleSubmit(functions.onSubmit)}
                    >
                        <Dialog.Title>
                            {isCreating
                                ? "Создание задачи"
                                : "Редактирование задачи"}
                        </Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            {isCreating
                                ? "Заполните поля, чтобы создать новую задачу"
                                : "Отредактируйте поля задачи"}
                        </Dialog.Description>

                        <Flex direction="column" gap="1">
                            <Label title="Название">
                                <TextField.Root
                                    color={
                                        state.form.formState.errors["title"]
                                            ? "red"
                                            : undefined
                                    }
                                    variant={
                                        state.form.formState.errors["title"]
                                            ? "soft"
                                            : undefined
                                    }
                                    {...state.form.register("title")}
                                />
                            </Label>
                            <Label title="Описание">
                                <TextArea
                                    placeholder="Reply to comment…"
                                    {...state.form.register("description")}
                                />
                            </Label>
                            <Label title="Проект">
                                {data.boards && (
                                    <BoardSelect
                                        boards={data.boards}
                                        isDisabled={!isCreating}
                                    />
                                )}
                            </Label>
                            <Label title="Исполнитель">
                                {data.users && (
                                    <AssigneeSelect users={data.users} />
                                )}
                            </Label>
                            <Label title="Статус">
                                <Select
                                    items={data.statuses}
                                    name="status"
                                    isDisabled={isCreating}
                                />
                            </Label>
                            <Label title="Приоритет">
                                <Select
                                    items={data.priorities}
                                    name="priority"
                                />
                            </Label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="between">
                            <Flex>
                                {task && !onBoard && (
                                    <Button
                                        type="button"
                                        variant="soft"
                                        onClick={() =>
                                            navigate(
                                                generatePath(ROUTES.BOARD, {
                                                    id: task?.boardId,
                                                }),
                                            )
                                        }
                                    >
                                        Перейти на доску
                                    </Button>
                                )}
                            </Flex>
                            <Flex gap="3">
                                <Dialog.Close>
                                    <Button type="button" variant="soft">
                                        Отмена
                                    </Button>
                                </Dialog.Close>
                                <Button type="submit" disabled={false}>
                                    {isCreating ? "Создать" : "Обновить"}
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </FormProvider>
    );
};

export default TaskForm;
