import {
    Button,
    Dialog,
    Flex,
    TextField,
    TextArea,
    IconButton,
    Text,
} from "@radix-ui/themes";
import useTaskForm from "./useTaskForm.ts";
import { FormProvider } from "react-hook-form";
import BoardSelect from "../../shared/ui/BoardSelect/BoardSelect.tsx";
import AssigneeSelect from "../../shared/ui/AssigneeSelect/AssigneeSelect.tsx";
import Select from "../../shared/ui/Select/Select.tsx";
import type { TaskFormProps } from "./types.ts";
import Label from "../../shared/ui/Label/Label.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes.ts";
import { Pencil1Icon } from "@radix-ui/react-icons";

const TaskForm = ({ isCreating, task }: TaskFormProps) => {
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
                    {isCreating ? (
                        <Button>Создать задачу</Button>
                    ) : (
                        <IconButton radius="large" variant="soft">
                            <Pencil1Icon width="18" height="18" />
                        </IconButton>
                    )}
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

                        <Flex direction="column">
                            <Label
                                title="Название"
                                bottom={
                                    state.form.formState.errors["title"]
                                        ? ""
                                        : "16px"
                                }
                            >
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
                                {state.form.formState.errors["title"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors["title"]
                                                ?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>

                            <Label
                                title="Описание"
                                bottom={
                                    state.form.formState.errors["description"]
                                        ? ""
                                        : "16px"
                                }
                            >
                                <TextArea
                                    color={
                                        state.form.formState.errors[
                                            "description"
                                        ]
                                            ? "red"
                                            : undefined
                                    }
                                    variant={
                                        state.form.formState.errors[
                                            "description"
                                        ]
                                            ? "soft"
                                            : undefined
                                    }
                                    {...state.form.register("description")}
                                />
                                {state.form.formState.errors["description"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors[
                                                "description"
                                            ]?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>
                            <Label
                                title="Проект"
                                bottom={
                                    state.form.formState.errors["boardId"]
                                        ? ""
                                        : "16px"
                                }
                            >
                                {data.boards && (
                                    <BoardSelect
                                        boards={data.boards}
                                        isDisabled={
                                            !isCreating ||
                                            (isCreating && state.onBoard)
                                        }
                                    />
                                )}
                                {state.form.formState.errors["boardId"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors[
                                                "boardId"
                                            ]?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>
                            <Label
                                title="Исполнитель"
                                bottom={
                                    state.form.formState.errors["assigneeId"]
                                        ? ""
                                        : "16px"
                                }
                            >
                                {data.users && (
                                    <AssigneeSelect users={data.users} />
                                )}
                                {state.form.formState.errors["assigneeId"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors[
                                                "assigneeId"
                                            ]?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>
                            <Label
                                title="Статус"
                                bottom={
                                    state.form.formState.errors["status"]
                                        ? ""
                                        : "16px"
                                }
                            >
                                <Select
                                    items={data.statuses}
                                    name="status"
                                    isDisabled={isCreating}
                                />
                                {state.form.formState.errors["status"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors[
                                                "status"
                                            ]?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>
                            <Label
                                title="Приоритет"
                                bottom={
                                    state.form.formState.errors["priority"]
                                        ? ""
                                        : "16px"
                                }
                            >
                                <Select
                                    items={data.priorities}
                                    name="priority"
                                />
                                {state.form.formState.errors["priority"] && (
                                    <Text size="1" color="red">
                                        {
                                            state.form.formState.errors[
                                                "priority"
                                            ]?.message as string
                                        }
                                    </Text>
                                )}
                            </Label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="between">
                            <Flex>
                                {task && !state.onBoard && (
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
                                <Button
                                    type="submit"
                                    disabled={state.isPending}
                                >
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
