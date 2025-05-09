import { prominent } from "color.js";
import { useEffect, useState } from "react";


export const ColorExtract = (image: string, amount: number) => {
    const [colors, setColors] = useState<string[]>([]);
    useEffect(() => {
        prominent(image, { amount: amount, format: "hex" }).then(colors => {
            setColors(colors as string[]);
        });
    }, [image, amount]);
    return colors;
}