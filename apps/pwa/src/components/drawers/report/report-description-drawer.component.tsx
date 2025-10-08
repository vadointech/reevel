import {
    BottomSheetBody, BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/bottom-sheet";
import { Button, ButtonsBlock, FormField, Header, Input } from "@/components/ui";
import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";
import { Section } from "@/components/sections";
import { IconArrowLeft } from "@/components/icons";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { ReportFromSchemaValues } from "@/features/reports/report-form.schema";
import { EventReportLabels } from "@/features/reports/config/event-report.config";
import { ReportType } from "@/entities/reports";

import { useEventReport } from "@/features/reports/hooks";

import styles from "./styles.module.scss";

export namespace ReportDescriptionDrawer {
    export type SubmitButtonProps = Button.Props & {
        onSubmit?: () => void;
    };

    export type Props = {
        controller?: BottomSheetExternalController;
        onCancel?: () => void;
        onSubmit?: () => void;
        children?: ReactNode;
    };
}

export const ReportDescriptionDrawer = ({
    controller,
    onCancel,
    onSubmit,
}: ReportDescriptionDrawer.Props) => {
    return (
        <BottomSheetRoot
            snapPoints={["fit-content"]}
            fadeThreshold={0}
            zIndex={40}
            externalController={controller}
        >
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.handle}>
                            <Header
                                size={"large"}
                                controlBefore={<IconArrowLeft />}
                                onControlBeforeClick={onCancel}
                            >
                                <Controller<ReportFromSchemaValues, "type">
                                    name={"type"}
                                    render={({ field }) => {
                                        return <>{ EventReportLabels[field.value as ReportType] }</>;
                                    }}
                                />
                            </Header>
                        </BottomSheetHandle>

                        <Section container>
                            <Controller<ReportFromSchemaValues, "description">
                                name={"description"}
                                render={({ field }) => (
                                    <FormField>
                                        <Input
                                            {...field}
                                            placeholder={"Add comment"}
                                            hint={"Please help us by telling what is wrong with the event you are reporting."}
                                        />
                                    </FormField>
                                )}
                            />
                        </Section>

                        <ButtonsBlock>
                            <Controller<ReportFromSchemaValues, "type">
                                name={"type"}
                                render={({ field }) => {
                                    if(field.value === ReportType.OTHER) {
                                        return (
                                            <Controller<ReportFromSchemaValues, "description">
                                                name={"description"}
                                                render={({ field }) => (
                                                    <SubmitButton
                                                        disabled={(field.value || "").length === 0}
                                                        onSubmit={onSubmit}
                                                    />
                                                )}
                                            />
                                        );
                                    }

                                    return <SubmitButton onSubmit={onSubmit}/>;
                                }}
                            />
                        </ButtonsBlock>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};

const SubmitButton = ({
    onSubmit,
    ...props
}: ReportDescriptionDrawer.SubmitButtonProps) => {
    const {
        isSubmitting,
        handleSubmitReport,
    } = useEventReport({
        onSuccess: onSubmit,
    });
    return (
        <Button
            {...props}
            type={"submit"}
            loading={isSubmitting}
            onClick={handleSubmitReport}
        >
            Send Report
        </Button>
    );
};