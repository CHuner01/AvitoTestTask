import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskList from "../pages/TaskList/TaskList.tsx";
import BoardList from "../pages/BoardList/BoardList.tsx";

function App() {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <TaskList />
                <BoardList />
            </QueryClientProvider>
        </>
    );
}

export default App;
