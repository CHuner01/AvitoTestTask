import { Button, Flex, Separator } from "@radix-ui/themes";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes.ts";
import TaskForm from "../TaskForm/TaskForm.tsx";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <Flex justify="between">
                    <Flex gap="4">
                        <Button onClick={() => navigate(ROUTES.TASKS)}>
                            Все задачи
                        </Button>
                        <Button onClick={() => navigate(ROUTES.BOARDS)}>
                            Проекты
                        </Button>
                    </Flex>
                    <TaskForm isCreating={true} />
                </Flex>
            </div>
            <Separator size="4" />
        </>
    );
};

export default Navbar;
