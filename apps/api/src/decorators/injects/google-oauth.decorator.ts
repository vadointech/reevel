import { Inject } from "@nestjs/common";

export const InjectGoogleOAuthService = (redirectURI: string) => {
    return Inject(redirectURI);
};