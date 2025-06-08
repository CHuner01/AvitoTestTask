import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { ROUTES } from "../../shared/routes.ts";
import { TaskList } from "../../pages/TaskList";
import { BoardList } from "../../pages/BoardList";
import { Board } from "../../pages/Board";

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
