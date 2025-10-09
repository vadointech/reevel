import { UseFormReturn } from "react-hook-form";
import { ReportFromSchemaValues } from "@/features/reports/report-form.schema";
import { createContext, useContext } from "react";

type ReportFormContextValues = UseFormReturn<ReportFromSchemaValues>;

export const ReportFormContext = createContext<ReportFormContextValues | null>(null);

export function useReportFormContext() {
    const ctx = useContext(ReportFormContext);
    if (!ctx) throw new Error("useReportFormContext must be used within a ReportFormProvider");
    return ctx;
}