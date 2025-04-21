import { Injectable } from "@nestjs/common";
import { ColorPaletteOptions, ImageColorPalettePreset } from "./types";
import { VibrantPresetService } from "./vibrant-preset.service";

@Injectable()
export class VibrantService {

    constructor(
        private readonly vibrantPresetService: VibrantPresetService,
    ) {}

    async extractColorPalette(buffer: Buffer, paletteOptions?: ColorPaletteOptions): Promise<string[]> {
        if(paletteOptions) {
            switch(paletteOptions.preset) {
                case ImageColorPalettePreset.Default:
                    return this.vibrantPresetService.vibrantDefault(buffer);
                case ImageColorPalettePreset.Extended:
                    return this.vibrantPresetService.vibrantExtended(buffer);
                default:
                    return this.vibrantPresetService.getPalette(buffer, paletteOptions.palette);

            }
        } else {
            return this.vibrantPresetService.getPalette(buffer);
        }
    }
}