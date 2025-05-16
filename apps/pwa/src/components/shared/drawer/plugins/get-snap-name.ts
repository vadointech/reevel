import { Drawer } from "../drawer.component";

export const snapPointsMap: Record<Drawer.SnapPoints, string | number> = {
    low: "168px",
    middle: "348px",
    hight: "524px",
    full: 1,
};

export const getSnapPointName = (value: string | number | null): Drawer.SnapPoints | null => {
    if (value === null) return null;
    if (value === 1) return "full";

    const entries = Object.entries(snapPointsMap);
    for (const [name, pxValue] of entries) {
        if (pxValue === value) {
            return name as Drawer.SnapPoints;
        }
    }
    return null;
};