import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/modules/auth/guards/auth.guard";
import { SeedModule } from './modules/seed/seed.module';

import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
        SeedModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AppController],
})
export class AppModule {}
