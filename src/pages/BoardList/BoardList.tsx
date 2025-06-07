import useBoardList from "./useBoardList.ts";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes.ts";
import Navbar from "../../widgets/Navbar/Navbar.tsx";

const BoardList = () => {
    const { data } = useBoardList();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            {data.boards?.map((board) => (
                <div key={board.id}>
                    <p>{board.id}</p>
                    <p>{board.name}</p>
                    <button
                        onClick={() =>
                            navigate(
                                generatePath(ROUTES.BOARD, { id: board.id }),
                            )
                        }
                    >
                        Перейти
                    </button>
                </div>
            ))}
        </>
    );
};

export default BoardList;
