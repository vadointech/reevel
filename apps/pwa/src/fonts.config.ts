import localFont from "next/font/local";

const creata = localFont({
    src: [
        {
            path: "../public/fonts/creata/Creata-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-creata",
});

const fonts = creata.variable;

export { fonts, creata };