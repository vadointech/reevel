import { ISessionController, ISessionStore } from "./types";
import { UserEntity } from "@/entities/user";
import { indexedDbService } from "@/lib/indexed-db.service";
import { SessionStore } from "@/features/session/session.store";

export class SessionController implements ISessionController {
    private readonly _store: SessionStore;

    constructor(store: SessionStore) {
        this._store = store;
        this.initSession();
    }

    get store(): ISessionStore {
        return this._store;
    }

    setSession(session: Maybe<UserEntity>): void {
        this._store.setUser(session);
    }

    updateSession(session: Partial<UserEntity>): Promise<void> {
        if(!this._store.user) return Promise.resolve();
        this.setSession({
            ...this._store.user,
            ...session,
            profile: {
                ...this._store.user.profile,
                ...session.profile,
            },
        });
        return indexedDbService.updateItem("session", this._store.user);
    }

    cleanSession(): Promise<void> {
        this.setSession(null);
        return indexedDbService.removeItem("session");
    }

    private async initSession(): Promise<void> {
        const { user } = this._store.plain;

        if(user) {
            return indexedDbService.setItem("session", user);
        } else {
            const persistedSession = await indexedDbService.getItem<UserEntity>("session");
            if(persistedSession) {
                return this.setSession(persistedSession);
            }
        }
    }
}