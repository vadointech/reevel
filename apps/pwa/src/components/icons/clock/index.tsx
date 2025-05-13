import { ComponentProps } from "react";

export const IconClock = (props: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_573_15576"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
    >
      <path
        d="M12 23C18.0753 23 23 18.0753 23 12C23 5.9247 18.0753 1 12 1C5.9247 1 1 5.9247 1 12C1 18.0753 5.9247 23 12 23Z"
        fill="white"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M12.0044 5.40234V12.0078L16.6678 16.6718"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#mask0_573_15576)">
      <path
        d="M-1.19995 -1.19922H25.2V25.2008H-1.19995V-1.19922Z"
        fill="#212629"
      />
    </g>
  </svg>
);
