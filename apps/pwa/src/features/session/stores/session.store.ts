"use client";

import { UserEntity } from "@/entities/user";
import { action, computed, makeObservable, observable } from "mobx";
import { localStoreService } from "@/lib/local-store.service";
import { UserProfileEntity } from "@/entities/profile";
import { createMobxStoreProvider } from "@/lib/mobx/mobx-store.provider";
import { initStore } from "@/lib/mobx";

interface State {
    user: Maybe<UserEntity>
}

class SessionStore implements State {
    user: Maybe<UserEntity> = null;

    constructor(init: Partial<State>) {
        makeObservable(this, {
            user: observable.shallow,
            isAuthenticated: computed,
            updateSession: action,
            logout: action,
        });

        initStore(this, init);
        this.initSession(init);
    }

    get isAuthenticated() {
        return !!this.user;
    }

    updateSession(user: Partial<{ user: Partial<UserEntity>; profile: Partial<UserProfileEntity>}>) {
        if(!this.user) return;
        this.user = {
            ...this.user,
            ...user.user,
            profile: {
                ...this.user.profile,
                ...user.profile,
            },
        };
        localStoreService.setItem("session", this.user);
    }

    logout() {
        this.user = null;
        localStoreService.removeItem("session");
    }

    private initSession(session: Partial<State>) {
        if(session) {
            localStoreService.setItem("session", session);
        } else {
            this.user = localStoreService.getItem<UserEntity>("session");
        }
    }
}

export const [SessionStoreProvider, useSessionStore] = createMobxStoreProvider(SessionStore);