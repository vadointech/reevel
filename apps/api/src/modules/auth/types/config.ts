interface TokenConfig {
    secret: string;
    cookieKey: string;
    expiresIn: string;
}
export interface IAuthModuleConfig {
    accessToken: TokenConfig,
    refreshToken: TokenConfig,
}

export interface AuthModuleConfigParams {
    accessToken?: Partial<TokenConfig>;
    refreshToken?: Partial<TokenConfig>;
}