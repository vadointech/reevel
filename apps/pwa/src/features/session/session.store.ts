"use client";

import { UserEntity } from "@/entities/user";
import { action, makeObservable, observable, toJS } from "mobx";

import { ISessionStore, SessionStoreInit } from "@/features/session/types";

export class SessionStore implements ISessionStore {
    user: Maybe<UserEntity> = null;

    constructor(init: SessionStoreInit) {
        this.user = init.user;

        makeObservable(this, {
            user: observable,
            setUser: action,
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
}