import { ComponentProps, forwardRef } from "react";

export namespace Cluster {
    export type Props = ComponentProps<"div"> & {
        lng: number;
        lat: number;
    };
}

export const Cluster = forwardRef<HTMLDivElement, Cluster.Props>(({ lng, lat }, ref) => {
    return (
        <div
            data-lng={lng}
            data-lat={lat}
            ref={ref}
            style={{
                width: 90,
                height: 90,
                borderRadius: "100%",
                backgroundColor: "red",
            }}
        >
            1
        </div>
    );
});