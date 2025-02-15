import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export default {
    origin: [
        process.env.PWA_PUBLIC_URL || "",
    ],
    credentials: true,
} satisfies CorsOptions;