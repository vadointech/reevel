export enum Devices {
    Mobile = "mobile",
    Desktop = "desktop",
    Tablet = "tablet",
    Console = "console",
    SmartTV = "smarttv",
    Wearable = "wearable",
    Embedded = "embedded",
}

export const allowedDevices: Array<string | undefined> = [
    Devices.Mobile,
    Devices.Tablet,
];

export enum StaticRoutes {
    Root = "/",
    Scan = "/scan",
    Login = "/login",
    Onboarding = "/onboarding",
    Discover = "/discover",
}

export const publicRoutes: string[] = [
    StaticRoutes.Discover,
];

export const onboardingStepRoutes: string[] = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick",
    "/onboarding/location/confirm",
    StaticRoutes.Discover,
];