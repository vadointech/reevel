"use client";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle,
    BottomSheetPortal, BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/bottom-sheet";
import { Header, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";

import { useEventReportDrawer } from "@/features/event/hooks";
import { ReportType } from "@/entities/reports";
import { ReportDescriptionDrawer } from "@/components/drawers/report/report-description-drawer.component";
import { ReportFormProvider } from "@/features/reports";
import { EventReportMessages } from "@/features/reports/config/event-report.config";

import styles from "./styles.module.scss";
import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";

export namespace ReportDrawer {
    export type FormProps = BottomSheetTrigger.Props & {
        overlay?: boolean;
        controller?: BottomSheetExternalController
    };
    export type Props = FormProps & {
        eventId: string;
    };
}

export const ReportDrawer = ({
    eventId,
    ...props
}: ReportDrawer.Props) => {
    return (
        <ReportFormProvider
            defaultValues={{
                entityId: eventId,
                type: ReportType.OTHER,
                description: "",
            }}
        >
            <ReportForm {...props} />
        </ReportFormProvider>
    );
};

const ReportForm = ({
    overlay,
    controller,
    ...props
}: ReportDrawer.FormProps) => {
    const {
        reportDrawerController,
        reportDescriptionDrawerController,

        handleReportEvent,
        handleCancelReport,
        handleSubmitReport,
    } = useEventReportDrawer(controller);

    return (
        <>
            <ReportDescriptionDrawer
                controller={reportDescriptionDrawerController}
                onCancel={handleCancelReport}
                onSubmit={handleSubmitReport}
            >
            </ReportDescriptionDrawer>
            <BottomSheetRoot
                overlay={overlay}
                externalController={reportDrawerController}
                snapPoints={["fit-content"]}
                fadeThreshold={0}
                zIndex={40}
            >
                {
                    typeof controller === "undefined" && (
                        <BottomSheetTrigger {...props} />
                    )
                }
                <BottomSheetPortal>
                    <BottomSheetBody>
                        <BottomSheetContent>
                            <BottomSheetHandle className={styles.handle}>
                                <Header size={"large"}>
                                    What would you like to report?
                                </Header>
                            </BottomSheetHandle>
                            <Section container>
                                <OptionsList>
                                    {
                                        EventReportMessages.map(item => (
                                            <OptionsListItem
                                                key={item.type}
                                                weight={"bold"}
                                                label={item.label}
                                                contentLeft={item.icon}
                                                description={item.description}
                                                onClick={() => handleReportEvent(item.type)}
                                            />
                                        ))
                                    }
                                </OptionsList>
                            </Section>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    );
};
