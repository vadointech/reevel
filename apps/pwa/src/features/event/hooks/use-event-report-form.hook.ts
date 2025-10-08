import { useCallback, useRef } from "react";
import { ReportType } from "@/entities/reports";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { useReportFormContext } from "@/features/reports";

export function useEventReportDrawer() {
    const reportDrawerController = useRef<IBottomSheetRootController | null>(null);
    const reportDescriptionDrawerController = useRef<IBottomSheetRootController | null>(null);

    const reportForm = useReportFormContext();

    const handleReportEvent = useCallback((type: ReportType) => {
        reportForm.setValue("type", type);
        reportDrawerController.current?.close();
        reportDescriptionDrawerController.current?.open();
    }, []);

    const handleCancelReport = useCallback(() => {
        reportDescriptionDrawerController.current?.close();
        reportDrawerController.current?.open();
    }, []);

    const handleSubmitReport = useCallback(() => {
        reportDescriptionDrawerController.current?.close();
    }, []);

    return {
        reportDrawerController,
        reportDescriptionDrawerController,

        handleReportEvent,
        handleCancelReport,
        handleSubmitReport,
    };
}