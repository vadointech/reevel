import { UserEntity } from "@/entities/user";
import { getSessionQuery } from "./query";

export namespace GetSession {
    export const url = "/users/me";

    export type TOutput = UserEntity;

    export const query = getSessionQuery;
}