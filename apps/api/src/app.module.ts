import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/modules/auth/guards/auth.guard";
import { EventModule } from "./modules/event/event.module";

import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
        EventModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AppController],
})
export class AppModule { }
