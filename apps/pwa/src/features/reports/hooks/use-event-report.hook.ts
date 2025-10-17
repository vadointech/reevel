import { useMutation } from "@tanstack/react-query";
import { ReportEvent } from "@/api/reports";
import { useReportFormContext } from "@/features/reports";
import { ReportEventMutation } from "@/features/reports/queries";
import { Mutation } from "@/lib/react-query";

type Params = Mutation<ReportEvent.TInput, ReportEvent.TOutput>;

export function useEventReport(params: Params = {}) {
    const reportForm = useReportFormContext();
  
    const reportEventMutation = useMutation({
        ...params,
        ...ReportEventMutation,
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
