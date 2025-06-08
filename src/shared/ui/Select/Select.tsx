import { Select as RadixSelect } from "@radix-ui/themes";
import { Controller, useFormContext } from "react-hook-form";

interface SelectProps {
    items: string[];
    name: string;
    isDisabled?: boolean;
}

const Select = ({ items, name, isDisabled }: SelectProps) => {
    const { control, formState } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <RadixSelect.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                >
                    <RadixSelect.Trigger
                        color={formState.errors[name] ? "red" : undefined}
                        variant={formState.errors[name] ? "soft" : undefined}
                    />
                    <RadixSelect.Content position="popper">
                        {items.map((item) => (
                            <RadixSelect.Item key={item} value={item}>
                                {item}
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Content>
                </RadixSelect.Root>
            )}
        />
    );
};

export default Select;
