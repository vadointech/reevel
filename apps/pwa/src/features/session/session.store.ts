"use client";

import { UserEntity } from "@/entities/user";
import { action, computed, makeObservable, observable, toJS } from "mobx";

import { ISessionStore, SessionStoreInit } from "@/features/session/types";

export class SessionStore implements ISessionStore {
    user: Maybe<UserEntity> = null;
    accessToken: string | undefined = undefined;

    constructor(init: Partial<SessionStoreInit> = {}) {
        this.user = init.user;
        this.accessToken = init.accessToken;

        makeObservable(this, {
            user: observable,
            setUser: action,
            authenticated: computed,
        });
    }

    toPlainObject(): Pick<ISessionStore, "user"> {
        return {
            user: toJS(this.user),
        };
    }

    dispose() {}

    setUser(user: Maybe<UserEntity>) {
        this.user = user;
    }

    get authenticated() {
        return !!this.user;
    }
}