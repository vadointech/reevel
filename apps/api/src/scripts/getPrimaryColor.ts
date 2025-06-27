import { readFileSync } from "fs";
import { Vibrant } from "node-vibrant/node";

async function getPrimaryColor(path: string): Promise<string | undefined> {
    const buffer = readFileSync(path);
    const palette = await Vibrant.from(buffer).quality(20).clearFilters().getPalette();
    return palette.Vibrant?.hex;
}

const imagePath = process.argv[2];
if (!imagePath) {
    console.log("Вкажіть шлях до зображення: ts-node getPrimaryColor.ts <image_path>");
    process.exit(1);
}

getPrimaryColor(imagePath)
    .then(color => {
        if (color) {
            console.log("Primary color:", color);
        } else {
            console.log("Primary color не знайдено.");
        }
    })
    .catch(e => {
        console.error("Помилка:", e.message);
    });