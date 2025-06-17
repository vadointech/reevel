import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@/config/config.service";
import corsConfig from "@/config/cors.config";
import { Logger, ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const config = new ConfigService();

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");

    app.enableCors(corsConfig);

    app.useLogger(new Logger());

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
        }),
    );

    await app.listen(config.env("PORT"));
}
bootstrap();