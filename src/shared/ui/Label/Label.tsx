import { Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
    title: string;
}

const Label = ({ children, title }: LabelProps) => {
    return (
        <label>
            <Text as="div" size="2" mb="1" weight="bold">
                {title}
            </Text>
            {children}
        </label>
    );
};

export default Label;
