import { Mutation } from "@/lib/react-query";
import { reportEvent, ReportEvent } from "@/api/reports";

export const ReportEventMutation: Mutation<ReportEvent.TInput, ReportEvent.TOutput> = {
    mutationFn: (body) => reportEvent({ body }).then(response => response.data),
};