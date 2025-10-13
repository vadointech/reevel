import { ISessionStore } from "./store";
import { UserEntity } from "@/entities/user";

export interface ISessionController {
    store: ISessionStore;
    setSession(session: Maybe<UserEntity>): void;
    updateSession(session: DeepPartial<UserEntity>): void;
    cleanSession(): Promise<void>;
}