import { getGoogleOAuthLink } from "./action";

export namespace GetGoogleOAuthLink {
    export const url = "/auth/google";

    export type TInput = null;
    export type TOutput = {
        link: string;
    };

    export const action = getGoogleOAuthLink;
}