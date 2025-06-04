"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: Infinity,
        },
    },
});
export const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider
            client={queryClient}
        >
            {/*<PersistQueryClientProvider*/}
            {/*    client={queryClient}*/}
            {/*    persistOptions={{*/}
            {/*        persister: indexedDBPersister,*/}
            {/*        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days*/}
            {/*        buster: "revel-app-version-1.0.0",*/}
            {/*    }}*/}
            {/*>*/}
            { children }
            {/*</PersistQueryClientProvider>*/}
        </QueryClientProvider>
    );
};