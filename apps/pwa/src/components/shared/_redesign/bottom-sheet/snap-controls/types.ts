export const BottomSheetSnapPointsConfig = {
    Top: "Top",
    Medium: "Medium",
    Bottom: "Bottom",
} as const;
export type BottomSheetSnapPointsConfig = ObjectValues<typeof BottomSheetSnapPointsConfig>;