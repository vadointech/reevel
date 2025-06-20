import { IMobxStore } from "@/lib/mobx";
import { UserEntity } from "@/entities/user";

export interface ISessionStore extends IMobxStore {
    user: Maybe<UserEntity>;
    toPlainObject(): Pick<ISessionStore, "user">;
}