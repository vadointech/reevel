interface ISessionBaseUser {
    id: string;
    token: string;
}

export interface ISessionUser extends ISessionBaseUser {
    email: string;
    subscription: string;
    location?: {
        id?: string;
        coordinates?: number[]
    }
}

export interface ServerSession<Session extends ISessionBaseUser = ISessionBaseUser> {
    user: Session
}

export interface EmptyServerSession<Session extends ISessionBaseUser = ISessionBaseUser> {
    user: Partial<Session>
}