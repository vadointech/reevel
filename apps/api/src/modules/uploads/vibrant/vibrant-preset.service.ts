import { Injectable } from "@nestjs/common";
import { ImageColorPalette } from "@/modules/uploads/vibrant/types";
import { Vibrant } from "node-vibrant/node";

interface VibrantPreset {
    vibrantDefault(buffer: Buffer): Promise<string[]>
    vibrantExtended(buffer: Buffer): Promise<string[]>
}

@Injectable()
export class VibrantPresetService implements VibrantPreset {
    private readonly defaultColorPalette: ImageColorPalette[] = [
        "Vibrant",
        "DarkVibrant",
        "Muted",
        "DarkMuted",
    ];

    async vibrantDefault(buffer: Buffer): Promise<string[]> {
        return this.getPalette(buffer, this.defaultColorPalette, 20)
            .then(res => this.removeDuplicates(res));
    }

    async vibrantExtended(buffer: Buffer): Promise<string[]> {
        return Promise.all([
            this.getPalette(buffer, this.defaultColorPalette, 20),
            this.getPalette(buffer, [ImageColorPalette.Vibrant], 40),
        ]).then(res => res.flat())
            .then(res => this.removeDuplicates(res));
    }

    async getPalette(buffer: Buffer, palette: ImageColorPalette[] = this.defaultColorPalette, quality: number = 20) {
        try {
            const vibrantPalette = await Vibrant.from(buffer)
                .quality(quality)
                .clearFilters()
                .getPalette();

            const paletteColors =
              palette.map(item => vibrantPalette[item])
                  .filter(item => !!item);

            return paletteColors.map(item => item.hex);
        } catch {
            return [];
        }
    }

    private async removeDuplicates(palette: string[]) {
        return [...new Set(palette)];
    }
}