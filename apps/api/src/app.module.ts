import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/modules/auth/guards/auth.guard";
import { EventEmitterModule } from "@nestjs/event-emitter";

import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        EventEmitterModule.forRoot(),
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
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
