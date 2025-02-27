import { UserEntity } from "@/entities/user";
import { Logout } from "@/api/auth/logout";
import { action, computed, makeObservable, observable } from "mobx";
import { localStoreService } from "@/lib/local-store.service";

export class SessionStore {
    user: Maybe<UserEntity> = null;

    constructor(session: Maybe<UserEntity>) {
        makeObservable(this, {
            user: observable,
            isAuthenticated: computed,
            updateSession: action,
            logout: action,
        });

        this.initSession(session);
    }

    get isAuthenticated() {
        return !!this.user;
    }

    updateSession(user: Partial<UserEntity>) {
        if(!this.user) return;
        this.user = {
            ...this.user,
            ...user,
        };
        localStoreService.setItem("session", this.user);
    }

    async logout() {
        this.user = null;
        localStoreService.removeItem("session");
        await Logout.query(null);
    }

    private initSession(session: Maybe<UserEntity>) {
        if(session) {
            this.user = session;
            localStoreService.setItem("session", session);
        } else {
            this.user = localStoreService.getItem<UserEntity>("session");
        }
    }
}