import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "@/modules/auth/guards/access-token.guard";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ReportsModule } from './modules/reports/reports.module';

import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        EventEmitterModule.forRoot(),
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
        ReportsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
    controllers: [AppController],
})
export class AppModule { }
