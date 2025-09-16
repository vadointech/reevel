import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@/config/config.service";
import corsConfig from "@/config/cors.config";
import { Logger, ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import * as path from "node:path";
import * as fs from "node:fs";

async function bootstrap() {
    const config = new ConfigService();


    // const keyFilePath = path.join(process.cwd(), "localhost+2-key.pem");
    // const certFilePath = path.join(process.cwd(), "localhost+2.pem");
    const app = await NestFactory.create(AppModule, {
        // httpsOptions: {
        //     key: fs.readFileSync(keyFilePath),
        //     cert: fs.readFileSync(certFilePath),
        // },
    });

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