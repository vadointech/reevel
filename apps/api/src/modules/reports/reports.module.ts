import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { ReportsRepository } from "@/modules/reports/repositories/reports.repository";

@Module({
    controllers: [ReportsController],
    providers: [
        ReportsService,
        ReportsRepository,
    ],
})
export class ReportsModule {}
