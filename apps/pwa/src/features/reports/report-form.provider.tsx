import { PropsWithChildren } from "react";
import {
    reportFormSchema,
    ReportFromSchemaValues,
} from "./report-form.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportFormContext } from "./report-form.context";

export namespace ReportFormProvider {
    export type Props = PropsWithChildren<{
        defaultValues?: ReportFromSchemaValues;
    }>;
}

export const ReportFormProvider = ({
    defaultValues,
    children,
}: ReportFormProvider.Props) => {
    const form = useForm({
        resolver: zodResolver(reportFormSchema),
        defaultValues,
    });

    return (
        <FormProvider {...form}>
            <ReportFormContext.Provider value={form}>
                { children }
            </ReportFormContext.Provider>
        </FormProvider>
    );
};
