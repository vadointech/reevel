import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@/config/config.service";
import corsConfig from "@/config/cors.config";

async function bootstrap() {
    const config = new ConfigService();

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");

    app.enableCors(corsConfig);

    await app.listen(config.env("PORT"));
}
bootstrap();