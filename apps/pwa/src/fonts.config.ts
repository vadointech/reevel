import localFont from "next/font/local";

const creata = localFont({
    src: [
        {
            path: "../public/fonts/creata/Creata-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-creata",
});

const fonts = creata.variable;

export { fonts, creata };