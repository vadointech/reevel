export type Session = ServerSession;

export type ServerSession = {
    user: {
        id: string;
        email: string;
        subscription: string;
        location?: {
            id: string;
            coordinates: number[]
        }
    };
};