import { logoutQuery } from "./query";

export namespace Logout {
    export const url = "/auth/logout";

    export type TInput = null;
    export type TOutput = null;

    export const query = logoutQuery;
}