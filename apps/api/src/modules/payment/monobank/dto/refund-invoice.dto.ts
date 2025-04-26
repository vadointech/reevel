import { MonobankApi } from "@/modules/payment/monobank/types";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { SupportedCurrencies } from "@/modules/payment/entities/payment.entity";

export class MakePaymentDto {
    @IsString()
    @IsNotEmpty()
    cardToken: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    amount: number;

    @IsEnum(SupportedCurrencies)
    ccy: SupportedCurrencies;

    @IsEnum(MonobankApi.PaymentInitialization)
    initiationKind: MonobankApi.PaymentInitialization;

    @IsString()
    @IsOptional()
    redirectUrl?: string;

    @IsString()
    @IsOptional()
    webHookUrl?: string;
}