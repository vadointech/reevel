import { ReportType } from "@/modules/reports/entities/reports.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @IsEnum(ReportType)
    @IsNotEmpty()
    type: ReportType;

    @IsString()
    @IsOptional()
    description?: string;
}