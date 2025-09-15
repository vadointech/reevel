import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

export interface JwtToken<P extends object> {
    payload: P;
    signature: string;
}

export type VerifiedJwtToken<P extends object> = P & {
    iat: number;
    exp: number;
};

export class JsonWebToken {
    static Sign<P extends object>(payload: P, secret: string): string;
    static Sign<P extends object>(payload: P, secret: string, options?: SignOptions): string;
    static Sign<P extends object>(payload: P, secret: string, options?: SignOptions): string {
        return jwt.sign(payload, secret, options);
    }

    static async SignAsync<P extends object>(payload: P, secret: string): Promise<string>;
    static async SignAsync<P extends object>(payload: P, secret: string, options?: SignOptions): Promise<string>;
    static async SignAsync<P extends object>(payload: P, secret: string, options?: SignOptions): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if(options) {
                jwt.sign(payload, secret, options, (error, encoded: string) => {
                    if(error) reject(error);
                    resolve(encoded);
                });
            } else {
                jwt.sign(payload, secret, (error, encoded: string) => {
                    if(error) reject(error);
                    resolve(encoded);
                });
            }
        });
    }

    static Verify<P extends object>(signature: string, secret: string): VerifiedJwtToken<P> {
        return jwt.verify(signature, secret) as VerifiedJwtToken<P>;
    }

    static async VerifyAsync<P extends object>(signature: string, secret: string): Promise<VerifiedJwtToken<P>> {
        return new Promise<VerifiedJwtToken<P>>((resolve, reject) => {
            jwt.verify(signature, secret, (error, decoded: VerifiedJwtToken<P>) => {
                if(error) reject(error);
                resolve(decoded);
            });
        });
    }
}