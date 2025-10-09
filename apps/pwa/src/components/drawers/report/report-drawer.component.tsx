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
import { BottomSheetGroupProvider } from "@/components/shared/bottom-sheet/group";
import { EventReportMessages } from "@/features/reports/config/event-report.config";

import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";

import styles from "./styles.module.scss";

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
        controllers,

        handleReportEvent,
        handleCancelReport,
        handleSubmitReport,
    } = useEventReportDrawer();

    return (
        <BottomSheetGroupProvider
            controllers={controllers}
        >
            <ReportDescriptionDrawer
                id={"description"}
                onCancel={handleCancelReport}
                onSubmit={handleSubmitReport}
            >
            </ReportDescriptionDrawer>
            <BottomSheetRoot
                id={"report"}
                overlay={overlay}
                externalController={controller}
                snapPoints={["fit-content"]}
                fadeThreshold={0}
                zIndex={20}
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
        </BottomSheetGroupProvider>
    );
};
