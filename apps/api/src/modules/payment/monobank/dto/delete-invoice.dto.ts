import { IsNotEmpty, IsString } from "class-validator";

export class DeleteInvoiceDto {
    @IsString()
    @IsNotEmpty()
    invoiceId: string;
}