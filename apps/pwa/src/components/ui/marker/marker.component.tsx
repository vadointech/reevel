import { ComponentProps, forwardRef } from "react";

export namespace Marker {
    export type Props = ComponentProps<"div">;
}

export const Marker = forwardRef<HTMLDivElement | null, Marker.Props>((props, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: 30,
                height: 30,
                backgroundColor: "red",
            }}
        >
        </div>
    );
});