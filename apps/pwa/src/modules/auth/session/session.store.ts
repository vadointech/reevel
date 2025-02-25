"use client";

import { UserEntity } from "@/entities/user";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import { GetSession } from "@/api/auth/get-session";
import { Logout } from "@/api/auth/logout";

class SessionStore {
    user: Maybe<UserEntity> = null;
    status: "idle" | "loading" = "idle";

    constructor() {
        makeObservable(this, {
            user: observable,
            status: observable,
            initSession: action,
            refreshSession: action,
            isAuthenticated: computed,
        });

        this.initSession();

        reaction(
            () => this.user,
            (user) => {
                window.localStorage.setItem("session", JSON.stringify(user));
            },
        );
    }

    async initSession() {
        this.status = "loading";
        const localSession = window.localStorage.getItem("session");
        if(localSession) {
            this.user = JSON.parse(localSession);
            this.status = "idle";
        }
        await this.refreshSession();
        this.status = "idle";
    }
    
    async refreshSession() {
        const { data } = await GetSession.query(null);
        if(data) {
            this.user = data;
        }
    }

    get isAuthenticated() {
        return !!this.user;
    }

    logout() {
        this.user = null;
        localStorage.removeItem("session");
        Logout.query(null);
    }
}

export const sessionStore = new SessionStore();