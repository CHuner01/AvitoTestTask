import type { IBoard } from "../../types.ts";
import styles from "./BoardCard.module.scss";
import { Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes.ts";

interface BoardCardProps {
    board: IBoard;
}

const BoardCard = ({ board }: BoardCardProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Flex
                direction="column"
                align="start"
                maxWidth="700px"
                minWidth="100px"
            >
                {board.name.length > 90 ? (
                    <Tooltip content={board.name}>
                        <Text truncate>{board.name}</Text>
                    </Tooltip>
                ) : (
                    <Text truncate>{board.name}</Text>
                )}
                {board.description.length > 90 ? (
                    <Tooltip content={board.description}>
                        <Text className={styles.decsription} truncate>
                            {board.description}
                        </Text>
                    </Tooltip>
                ) : (
                    <Text className={styles.decsription} truncate>
                        {board.description}
                    </Text>
                )}
            </Flex>
            <Flex direction="row" gap="3" align="center" justify="between">
                <Text className={styles.text}>{board.taskCount}</Text>
                <IconButton
                    radius="large"
                    variant="soft"
                    onClick={() =>
                        navigate(
                            generatePath(ROUTES.BOARD, {
                                id: board.id,
                            }),
                        )
                    }
                >
                    <ArrowTopRightIcon width="18" height="18" />
                </IconButton>
            </Flex>
        </div>
    );
};

export default BoardCard;
