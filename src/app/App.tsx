import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupStore } from "../shared/store/store.ts";
import { Provider } from "react-redux";
import Routes from "./routes/Routes.tsx";

function App() {
    const queryClient = new QueryClient();
    const store = setupStore();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Routes />
                </Provider>
            </QueryClientProvider>
        </>
    );
}

export default App;
