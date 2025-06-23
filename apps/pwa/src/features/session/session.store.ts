"use client";

import { UserEntity } from "@/entities/user";
import { action, makeObservable, observable, toJS } from "mobx";
import { constructorInit } from "@/lib/init";

import { ISessionStore } from "@/features/session/types";

export class SessionStore implements ISessionStore {
    user: Maybe<UserEntity> = null;

    constructor(init: Partial<ISessionStore> = {}) {
        makeObservable(this, {
            user: observable,
            setUser: action,
        });

        constructorInit(this, init);
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