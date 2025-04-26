import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    ArrayUnique,
} from "class-validator";
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

class MerchantPaymentInfo {
    @IsString()
    @IsOptional()
    reference?: string;

    @IsString()
    @MaxLength(280)
    @IsOptional()
    destination?: string;

    @IsString()
    @MaxLength(280)
    @IsOptional()
    comment?: string;

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    @IsString({ each: true })
    @Type(() => Number)
    customerEmails?: string[];
}

export class CreateInvoiceMonobankDto {
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

    @IsString()
    @IsOptional()
    redirectUrl?: string;

    @IsString()
    @IsOptional()
    webHookUrl?: string;

    @IsOptional()
    @Type(() => SaveCardDataDto)
    saveCardData?: SaveCardDataDto;

    @IsOptional()
    @Type(() => MerchantPaymentInfo)
    merchantPaymInfo?: MerchantPaymentInfo;
}