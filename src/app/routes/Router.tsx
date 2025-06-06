import TaskList from "../../pages/TaskList/TaskList.tsx";
import BoardList from "../../pages/BoardList/BoardList.tsx";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import Board from "../../pages/Board/Board.tsx";
import { ROUTES } from "../../shared/routes.ts";

const Router = () => {
    const routes = [
        {
            path: ROUTES.TASKS,
            element: <TaskList />,
        },
        {
            path: ROUTES.BOARDS,
            element: <BoardList />,
        },
        {
            path: ROUTES.BOARD,
            element: <Board />,
        },
        {
            path: "*",
            element: <Navigate to={ROUTES.TASKS} replace />,
        },
    ];

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
};

export default Router;
