import Navbar from "../Navbar/Navbar.tsx";
import { Text } from "@radix-ui/themes";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.center}>
                <Text size="4">Ошибка, попробуйте перезагрузить страницу</Text>
            </div>
        </>
    );
};

export default ErrorPage;
