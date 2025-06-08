import { Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
    title: string;
    bottom?: string;
}

const Label = ({ children, title, bottom }: LabelProps) => {
    return (
        <label
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: bottom,
            }}
        >
            <Text as="div" size="2" mb="1" weight="bold">
                {title}
            </Text>
            {children}
        </label>
    );
};

export default Label;
