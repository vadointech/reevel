import localFont from "next/font/local";

const creata = localFont({
    src: [
        {
            path: "../public/fonts/creata/Creata-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/creata/Creata-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-creata"
});

const fonts = creata.variable;

export { fonts, creata };