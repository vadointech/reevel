import { ComponentProps } from "react";

export const ArrowBack = (props: ComponentProps<"svg">) => (
    <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M15.7238 7.47259L10.0591 12.9471L10.7573 13.6163L17.6022 6.99999L10.7573 0.383639L10.0591 1.05284L15.7248 6.52739H0.28857V7.47259H15.7238Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.6022 6.99999L10.7573 0.383639L10.0591 1.05284L15.7248 6.52739H0.28857V7.47259H15.7238L10.0591 12.9471L10.7573 13.6163L17.6022 6.99999ZM15.0521 7.73725L9.6605 12.9479L10.7582 14L18 7L10.7582 0L9.66049 1.05211L15.053 6.26275H0V7.73725H15.0521Z" fill="white"/>
    </svg>
);