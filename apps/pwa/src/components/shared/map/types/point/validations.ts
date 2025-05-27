import { BasePoint, IconPoint } from "@/components/shared/map/types";

export function isIconPoint(point: BasePoint): point is IconPoint {
    return typeof point["iconType"] !== "undefined";
}