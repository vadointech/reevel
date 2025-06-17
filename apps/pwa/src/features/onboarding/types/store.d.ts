export interface IOnboardingStore {
    fullName: string;
    bio: string;
    picture: string;
    interests: string[];
    locationCenter?: [number, number];
    locationBbox?: [number, number, number, number];
    locationQuery: string;
}