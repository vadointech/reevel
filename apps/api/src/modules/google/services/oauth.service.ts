import { BadRequestException, Injectable } from "@nestjs/common";
import { auth, oauth2 } from "@googleapis/oauth2";
import { oauth2_v2 } from "@googleapis/oauth2/v2";
import { GoogleOAuthUserInfo } from "../types/oauth";

@Injectable()
export class GoogleOAuthService {

    private readonly OAuthClient: any;
    private readonly client: oauth2_v2.Oauth2;

    constructor({ clientId, clientSecret, redirectUrl }: {
        clientId: string,
        clientSecret: string,
        redirectUrl: string
    }) {
        this.OAuthClient = new auth.OAuth2({
            clientId,
            clientSecret,
            redirectUri: redirectUrl,
        });

        this.client = oauth2({
            version: "v2",
            auth: this.OAuthClient,
        });
    }

    generateAuthUrl(): Promise<string> {
        return this.OAuthClient.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
        });
    }

    async getOAuthTokens(code: string) {
        const { tokens } = await this.OAuthClient.getToken(code);
        return tokens;
    }

    async getOAuthUserInfo(code: string): Promise<GoogleOAuthUserInfo | null> {
        const credentials = await this.getOAuthTokens(code);

        if(!credentials.access_token || !credentials.refresh_token) {
            throw new BadRequestException("Bad Request");
        }

        this.OAuthClient.setCredentials({ access_token: credentials.access_token });
        const user =  await this.client.userinfo.get();

        if(!user.data.email) {
            return null;
        }

        return user.data as GoogleOAuthUserInfo;
    }
}