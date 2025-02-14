import { Injectable } from "@nestjs/common";
import { auth, oauth2 } from "@googleapis/oauth2";
import { oauth2_v2 } from "@googleapis/oauth2/v2";

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

    generateAuthUrl() {
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

    async getUserInfo(access_token: string) {
        this.OAuthClient.setCredentials({ access_token });
        const user =  await this.client.userinfo.get();
        return user.data;
    }
}