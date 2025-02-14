import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { ConfigModule } from "@/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import modules from "@/modules";
import dbConfig from "@/config/db.config";

@Module({
    imports: [
        ...modules,
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
    ],
    controllers: [AppController],
})
export class AppModule {}
