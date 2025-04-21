import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PaymentType } from "../entities/payment.entity";

export class CreatePaymentDto {
    @IsEnum(PaymentType)
    @IsNotEmpty()
    type: PaymentType;

    @IsNumber()
    @IsOptional()
    amount?: number;
}