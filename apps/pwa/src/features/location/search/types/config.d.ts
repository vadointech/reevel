
export type LocationSearchConfigParams = {
    callbackUrl: string;
    confirmUrl: string;
    confirmationParam?: string;
};

export type LocationSearchInternalConfig = LocationSearchConfigParams & {
    confirmationParam: string;
};