import Navbar from "../Navbar/Navbar.tsx";
import { ClipLoader } from "react-spinners";
import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.center}>
                <ClipLoader size={48} color="#0077FF" />
            </div>
        </>
    );
};

export default LoadingPage;
