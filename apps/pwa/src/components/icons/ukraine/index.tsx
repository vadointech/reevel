import { ComponentProps } from "react";

export const IconUkraine = (props: ComponentProps<"svg">) => (
    <svg
        width={26}
        height={27}
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask
            id="mask0_649_4534"
            style={{
                maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={26}
            height={27}
        >
            <path
                d="M13 26.5C20.1797 26.5 26 20.6797 26 13.5C26 6.3203 20.1797 0.5 13 0.5C5.8203 0.5 0 6.3203 0 13.5C0 20.6797 5.8203 26.5 13 26.5Z"
                fill="white"
            />
        </mask>
        <g mask="url(#mask0_649_4534)">
            <path
                d="M0 13.4988L13.1016 11.498L26 13.4988V26.4988H0V13.4988Z"
                fill="#FFDA44"
            />
            <path d="M0 0.5H26V13.5H0V0.5Z" fill="#338AF3" />
        </g>
    </svg>
);
