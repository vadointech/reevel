export const SnapPointsConfig = {
    Low: "Low",
    Medium: "Medium",
    High: "High",
} as const;
export type SnapPointsConfig = ObjectValues<typeof SnapPointsConfig>;

export const snapPointsConfig: Record<SnapPointsConfig, number> = {
    [SnapPointsConfig.Low]: .14,
    [SnapPointsConfig.Medium]: .5,
    [SnapPointsConfig.High]: .95,
};