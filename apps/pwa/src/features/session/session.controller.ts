import { ISessionController } from "./types";
import { UserEntity } from "@/entities/user";
import { indexedDbService } from "@/lib/indexed-db.service";
import { SessionStore } from "@/features/session/session.store";

export class SessionController implements ISessionController {
    constructor(
        public store: SessionStore,
    ) {}

    setSession(session: Maybe<UserEntity>): void {
        this.store.setUser(session);
    }

    updateSession(session: Partial<UserEntity>) {
        if(!this.store.user) return Promise.resolve();
        this.setSession({
            ...this.store.user,
            ...session,
            profile: {
                ...this.store.user.profile,
                ...session.profile,
            },
        });
    }

    cleanSession(): Promise<void> {
        this.setSession(null);
        return indexedDbService.removeItem("session");
    }
}