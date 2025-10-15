"use client";

import { UserEntity } from "@/entities/user";
import { action, computed, makeObservable, observable, toJS } from "mobx";

import { ISessionStore } from "@/features/session/types";

export class SessionStore implements ISessionStore {
    user: Maybe<UserEntity> = null;
    loading: boolean = true;

    constructor() {
        makeObservable(this, {
            user: observable,
            loading: observable,
            setUser: action,
            setLoading: action,
            authenticated: computed,
        });
    }

    get authenticated() {
        return !!this.user;
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

    setLoading(loading: boolean) {
        this.loading = loading;
    }
}