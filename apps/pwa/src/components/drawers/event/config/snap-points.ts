export const HERO_SECTION_OFFSET = 350;

export enum SnapPoints {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}
export const snapPoints = new Map<SnapPoints, number>([
    [SnapPoints.Low, .14],
    [SnapPoints.Medium, .5],
    [SnapPoints.High, .95],
]);