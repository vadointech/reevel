import { IAuthModuleConfig } from "./types/config";

export const AUTH_MODULE_CONFIG = "AUTH_MODULE_CONFIG";

export class AuthModuleConfig implements IAuthModuleConfig {
    accessToken: IAuthModuleConfig["accessToken"];
    refreshToken: IAuthModuleConfig["refreshToken"];

    constructor(params: IAuthModuleConfig) {
        this.accessToken = params.accessToken;
        this.refreshToken = params.refreshToken;
    }
}