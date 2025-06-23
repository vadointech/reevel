import { ComponentProps } from "react";

export const IconFlagEngland = (props: ComponentProps<"svg">) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        {...props}
    >
        <mask id="circleFlagsUk0"><circle cx="256" cy="256" r="256" fill="#fff"/></mask>
        <g mask="url(#circleFlagsUk0)">
            <path fill="#eee" d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z"/>
            <path fill="#0052b4" d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"/>
            <path fill="#d80027" d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z"/>
        </g>
    </svg>
);

export const IconFlagUkraine = (props: ComponentProps<"svg">) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        {...props}
    >
        <mask id="circleFlagsLangUk0">
            <circle cx="256" cy="256" r="256" fill="#fff"/>
        </mask>
        <g mask="url(#circleFlagsLangUk0)">
            <path fill="#ffda44" d="m0 256l258-39.4L512 256v256H0z"/>
            <path fill="#338af3" d="M0 0h512v256H0z"/>
        </g>
    </svg>
);

export const IconFlagSystem = (props: ComponentProps<"svg">) => (
    <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask id="mask0_1102_17263" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0">
            <circle cx="256" cy="256" r="256" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_1102_17263)">
            <mask id="mask1_1102_17263" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="74">
                <path d="M75.0193 74.9999C-24.9549 174.974 -24.9549 337.064 75.0193 437.039C174.994 537.013 337.084 537.013 437.058 437.039L75.0193 74.9999Z" fill="white"/>
            </mask>
            <g mask="url(#mask1_1102_17263)">
                <path d="M0 256H256H512V512H0V256Z" fill="#FFDA44"/>
                <path d="M0 0H512V256H0V0Z" fill="#338AF3"/>
            </g>
            <mask id="mask2_1102_17263" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="75" y="0">
                <path d="M437.039 437.058C537.013 337.084 537.013 174.994 437.039 75.0194C337.064 -24.9548 174.974 -24.9548 75 75.0194L437.039 437.058Z" fill="white"/>
            </mask>
            <g mask="url(#mask2_1102_17263)">
                <path d="M0 0.00012207L8 22.0001L0 45.0001V68.0001L32 122L0 176V208L32 256L0 304V336L32 390L0 444V512L22 504L45 512H68L122 480L176 512H208L256 480L304 512H336L390 480L444 512H512L504 490L512 467V444L480 390L512 336V304L480 256L512 208V176L480 122L512 68.0001V0.00012207L490 8.00012L467 0.00012207H444L390 32.0001L336 0.00012207H304L256 32.0001L208 0.00012207H176L122 32.0001L68 0.00012207H0Z" fill="#EEEEEE"/>
                <path d="M336 0.00012207V108L444 0.00012207H336ZM512 68.0001L404 176H512V68.0001ZM0 176H108L0 68.0001V176ZM68 0.00012207L176 108V0.00012207H68ZM176 512V404L68 512H176ZM0 444L108 336H0V444ZM512 336H404L512 444V336ZM444 512L336 404V512H444Z" fill="#0052B4"/>
                <path d="M0 0.00012207V45.0001L131 176H176L0 0.00012207ZM208 0.00012207V208H0V304H208V512H304V304H512V208H304V0.00012207H208ZM467 0.00012207L336 131V176L512 0.00012207H467ZM176 336L0 512H45L176 381V336ZM336 336L512 512V467L381 336H336Z" fill="#D80027"/>
            </g>
        </g>
    </svg>
);
