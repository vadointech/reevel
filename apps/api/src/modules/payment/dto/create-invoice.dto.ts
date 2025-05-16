import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsEnum, IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { PaymentType, SupportedCurrencies } from "@/modules/payment/entities/payment.entity";

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()
    paymentId: string;

    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType: PaymentType;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    ticketPrice: number;

    @IsEnum(SupportedCurrencies)
    @IsNotEmpty()
    ticketCurrency: SupportedCurrencies;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    fee?: number;
}