import { useCallback, useRef } from "react";
import { ReportType } from "@/entities/reports";
import { useReportFormContext } from "@/features/reports";
import { BottomSheetControllersGroup } from "@/components/shared/bottom-sheet/group";

export function useEventReportDrawer() {
    const controllers = useRef<BottomSheetControllersGroup<"report" | "description">>({});

    const reportForm = useReportFormContext();

    const handleReportEvent = useCallback((type: ReportType) => {
        reportForm.setValue("type", type);

        controllers.current.report?.close();
        controllers.current.description?.open();
    }, []);

    const handleCancelReport = useCallback(() => {
        controllers.current.description?.close();
        controllers.current.report?.open();
    }, []);

    const handleSubmitReport = useCallback(() => {
        controllers.current.description?.close();
    }, []);

    return {
        controllers,

        handleReportEvent,
        handleCancelReport,
        handleSubmitReport,
    };
}