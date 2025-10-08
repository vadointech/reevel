import { Body, Controller, Param, Post } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "@/modules/reports/dto/create-report.dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/types";

@Controller("reports")
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
    ) {}

    @Post("/event/:eventId")
    async reportEvent(
        @Param("eventId") eventId: string,
        @Body() body: CreateReportDto,
        @Session() session: ServerSession,
    ) {
        return this.reportsService.reportEvent(session, eventId, body);
    }
}
