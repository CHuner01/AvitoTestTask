import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupStore } from "../shared/store/store.ts";
import { Provider } from "react-redux";
import Router from "./router/Router.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./App.module.scss";

function App() {
    const queryClient = new QueryClient();
    const store = setupStore();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Theme>
                        <Router />
                    </Theme>
                </Provider>
            </QueryClientProvider>
        </>
    );
}

export default App;
