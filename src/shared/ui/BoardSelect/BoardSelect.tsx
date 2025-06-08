import { Select as RadixSelect } from "@radix-ui/themes";
import type { IBoard } from "../../types.ts";
import { Controller, useFormContext } from "react-hook-form";

interface BoardSelectProps {
    boards: IBoard[];
    isDisabled?: boolean;
}

const BoardSelect = ({ boards, isDisabled }: BoardSelectProps) => {
    const { control, formState } = useFormContext();

    return (
        <Controller
            name="boardId"
            control={control}
            render={({ field }) => (
                <RadixSelect.Root
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                    disabled={isDisabled}
                >
                    <RadixSelect.Trigger
                        placeholder="Выбрать проект"
                        color={formState.errors["boardId"] ? "red" : undefined}
                        variant={
                            formState.errors["boardId"] ? "soft" : undefined
                        }
                    />
                    <RadixSelect.Content position="popper">
                        {boards.map((board) => (
                            <RadixSelect.Item
                                key={board.id}
                                value={String(board.id)}
                            >
                                {board.name}
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Content>
                </RadixSelect.Root>
            )}
        />
    );
};

export default BoardSelect;
