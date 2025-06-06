import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskList from "../pages/TaskList/TaskList.tsx";
import BoardList from "../pages/BoardList/BoardList.tsx";
import { setupStore } from "../shared/store/store.ts";
import { Provider } from "react-redux";

function App() {
    const queryClient = new QueryClient();
    const store = setupStore();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <TaskList />
                    <BoardList />
                </Provider>
            </QueryClientProvider>
        </>
    );
}

export default App;
