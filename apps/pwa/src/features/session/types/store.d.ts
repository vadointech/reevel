import { IMobxStore } from "@/lib/mobx";
import { UserEntity } from "@/entities/user";

export interface SessionStoreInit {
    user: Maybe<UserEntity>;
    accessToken: string | undefined;
    authenticated: boolean;
}

export interface ISessionStore extends SessionStoreInit, IMobxStore {
    toPlainObject(): Pick<ISessionStore, "user">;
}