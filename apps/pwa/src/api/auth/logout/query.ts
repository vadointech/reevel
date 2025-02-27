import { action } from "@/lib/action/action";
import { clientFetcher } from "@/api/client";
import { Logout } from "./index";

export const logoutQuery = action<Logout.TInput, Logout.TOutput>({
    fetchFn: ({ config }) => {
        return clientFetcher.get(Logout.url, config);
    },
});