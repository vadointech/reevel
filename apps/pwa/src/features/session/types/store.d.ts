import { IMobxStore } from "@/lib/mobx";
import { UserEntity } from "@/entities/user";

export interface ISessionStore extends SessionStoreInit, IMobxStore {
    user: Maybe<UserEntity>;
    loading: boolean;
    authenticated: boolean;
    toPlainObject(): Pick<ISessionStore, "user">;
}