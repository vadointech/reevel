import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { SupportedCurrencies } from "@/modules/payment/entities/payment.entity";

class SaveCardDataDto {
    @IsBoolean()
    @IsNotEmpty()
    saveCard: boolean;

    @IsString()
    @IsNotEmpty()
    walletId: string;
}

export class CreateInvoiceDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    amount: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    agentFeePercent?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    ccy: SupportedCurrencies;

    @IsOptional()
    @Type(() => SaveCardDataDto)
    saveCardData?: SaveCardDataDto;
}