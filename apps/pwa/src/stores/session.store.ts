import { UserEntity } from "@/entities/user";
import { action, makeObservable, observable } from "mobx";

export class SessionStore {
    user: Maybe<UserEntity> = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            updateSession: action,
            clearSession: action,
        });
    }

    init(user: Maybe<UserEntity>): void {
        this.user = user;
    }

    updateSession(user: Partial<UserEntity>): UserEntity | null {
        if(this.user) {
            this.user = {
                ...this.user,
                ...user,
            };

            return this.user;
        } else {
            return null;
        }
    }

    clearSession(): void {
        this.user = null;
    }
}

export const sessionStore = new SessionStore();