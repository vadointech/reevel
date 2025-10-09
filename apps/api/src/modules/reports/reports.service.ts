import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "@/modules/reports/dto/create-report.dto";
import { ReportsRepository } from "@/modules/reports/repositories/reports.repository";
import { ServerSession } from "@/types";

@Injectable()
export class ReportsService {
    constructor(
        private readonly reportsRepository: ReportsRepository,
    ) {}

    async reportEvent(session: ServerSession, eventId: string, input: CreateReportDto) {
        try {
            return this.reportsRepository.createAndSave({
                eventId,
                userId: session.user.id,
                type: input.type,
                description: input.description,
            });
        } catch {
            return false;
        }
    }
}
