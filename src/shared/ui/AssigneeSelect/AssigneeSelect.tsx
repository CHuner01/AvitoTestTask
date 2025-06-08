import { Controller, useFormContext } from "react-hook-form";
import { Select as RadixSelect } from "@radix-ui/themes/components/index";
import type { IUser } from "../../types.ts";

const AssigneeSelect = ({ users }: { users: IUser[] }) => {
    const { control, formState } = useFormContext();

    return (
        <Controller
            name="assigneeId"
            control={control}
            render={({ field }) => (
                <RadixSelect.Root
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                >
                    <RadixSelect.Trigger
                        placeholder="Выбрать исполнителя"
                        color={
                            formState.errors["assigneeId"] ? "red" : undefined
                        }
                        variant={
                            formState.errors["assigneeId"] ? "soft" : undefined
                        }
                    />
                    <RadixSelect.Content position="popper">
                        {users.map((user) => (
                            <RadixSelect.Item
                                key={user.id}
                                value={String(user.id)}
                            >
                                {user.fullName}
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Content>
                </RadixSelect.Root>
            )}
        />
    );
};

export default AssigneeSelect;
