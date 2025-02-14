import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleModule } from './modules/google/google.module';
import { AuthModule } from './modules/auth/auth.module';
import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
        GoogleModule,
        AuthModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
