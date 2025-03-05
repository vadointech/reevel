"use client";

import { UserEntity } from "@/entities/user";
import { action, computed, makeObservable, observable } from "mobx";
import { localStoreService } from "@/lib/local-store.service";
import { UserProfileEntity } from "@/entities/profile";
import { createMobxStoreProvider } from "@/lib/mobx-store.provider";
import { logout } from "@/api/auth/logout";

class SessionStore {
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

    updateSession(user: Partial<{ user: Partial<UserEntity>; profile: Partial<UserProfileEntity>}>) {
        if(!this.user) return;
        this.user = {
            ...this.user,
            ...user.user,
            ...user.profile,
        };
        localStoreService.setItem("session", this.user);
    }

    async logout() {
        this.user = null;
        localStoreService.removeItem("session");
        await logout();
    }

    private initSession(session: Maybe<UserEntity>) {
        const localSession = localStoreService.getItem<UserEntity>("session");

        if(session) {
            this.user = session;
            localStoreService.setItem("session", session);
        } else {
            this.user = localSession;
        }
    }
}

export const [SessionStoreProvider, useSessionStore] = createMobxStoreProvider(SessionStore);