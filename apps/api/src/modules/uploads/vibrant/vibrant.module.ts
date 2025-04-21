import { Module } from "@nestjs/common";
import { VibrantService } from "./vibrant.service";
import { VibrantPresetService } from "./vibrant-preset.service";

@Module({
    providers: [VibrantService, VibrantPresetService],
    exports: [VibrantService],
})
export class VibrantModule {}
