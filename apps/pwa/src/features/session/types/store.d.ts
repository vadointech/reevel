import { IMobxStore } from "@/lib/mobx";
import { UserEntity } from "@/entities/user";

export interface SessionStoreInit {
    user: Maybe<UserEntity>;
}

export interface ISessionStore extends SessionStoreInit, IMobxStore {
    toPlainObject(): Pick<ISessionStore, "user">;
}