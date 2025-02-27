import { UserEntity } from "@/entities/user";
import { getSessionRequest } from "./action";

export namespace GetSession {
    export const url = "/users/me";

    export type TInput = null;
    export type TOutput = UserEntity;

    export const action = getSessionRequest;
}