import { ComponentProps } from "react";

export const IconClose = (props: ComponentProps<"svg">) => (
    <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M1 1L19 19M1 19L19 1" stroke="#212629" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);