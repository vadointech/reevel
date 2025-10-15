import { ISessionController } from "./types";
import { UserEntity } from "@/entities/user";
import { indexedDbService } from "@/lib/indexed-db.service";
import { SessionStore } from "@/features/session/session.store";
import { QueryClient } from "@tanstack/react-query";
import { GetSessionQuery } from "@/features/session/queries";

export class SessionController implements ISessionController {
    private readonly queryClient = new QueryClient();

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

    initSession() {
        this.store.setLoading(true);
        this.queryClient.fetchQuery(GetSessionQuery())
            .then(session => this.setSession(session))
            .finally(() => this.store.setLoading(false));
    }
}