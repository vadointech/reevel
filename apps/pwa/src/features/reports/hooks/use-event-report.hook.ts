import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ReportEvent } from "@/api/reports";
import { FetcherErrorResponse } from "@/lib/fetcher/types";
import { reportEvent } from "@/api/reports/server";
import { useReportFormContext } from "@/features/reports";

type Params = UseMutationOptions<ReportEvent.TOutput, FetcherErrorResponse, ReportEvent.TInput>;

export function useEventReport(params: Params = {}) {
    const reportForm = useReportFormContext();
  
    const reportEventMutation = useMutation({
        mutationFn: reportEvent,
        ...params,
        onSuccess: (...args) => {
            reportForm.reset();
            params.onSuccess?.(...args);
        },
    });

    const handleSubmitReport = reportForm.handleSubmit((values) => {
        reportEventMutation.mutate({
            eventId: values.entityId,
            type: values.type,
            description: values.description,
        });
    });

    return {
        handleSubmitReport,
        isSubmitting: reportEventMutation.isPending,
    };
}
