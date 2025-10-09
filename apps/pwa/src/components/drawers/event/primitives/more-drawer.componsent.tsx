import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle,
    BottomSheetPortal, BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/bottom-sheet";
import { IconCopy, IconExit, IconProfile, IconReport, IconShare } from "@/components/icons";
import { Section } from "@/components/sections";
import { OptionsList, OptionsListItem } from "@/components/ui";
import { PropsWithChildren } from "react";

import { useTicketReservation } from "@/features/event/booking/hooks";
import { useEventActions } from "@/features/event/hooks";
import { EventEntity, EventParticipationType } from "@/entities/event";
import { useRouter } from "@/i18n/routing";

import styles from "../styles.module.scss";
import cx from "classnames";
import { ReportDrawer } from "@/components/drawers/report";

export namespace EventMoreActionsDrawer {
    export type Props = PropsWithChildren<EventEntity>;
}

export const EventMoreActionsDrawer = ({
    children,
    ...event
}: EventMoreActionsDrawer.Props) => {
    const router = useRouter();

    const {
        bottomSheetController,
        reportDrawerController,
      
        handleShareEvent,
        handleCopyLocation,
        handleReport,
    } = useEventActions(event);

    const {
        handleCancelTicketReservation,
    } = useTicketReservation(
        event.id,
        {
            onTicketCancelled: () => {
                bottomSheetController.current?.close();
                router.refresh();
            },
        },
    );

    return (
        <>
            <ReportDrawer
                eventId={event.id}
                controller={reportDrawerController}
            />
            <BottomSheetRoot
                snapPoints={["fit-content"]}
                fadeThreshold={0}
                zIndex={40}
                externalController={bottomSheetController}
            >
                <BottomSheetTrigger
                    className={cx(
                        styles.button,
                        styles.button_more,
                    )}
                >
                    { children }
                </BottomSheetTrigger>
                <BottomSheetPortal>
                    <BottomSheetBody>
                        <BottomSheetContent>
                            <BottomSheetHandle />
                            <Section container className={styles.moreDrawer__gap}>
                                <OptionsList>
                                    <OptionsListItem
                                        label={"Share event"}
                                        contentLeft={<IconShare />}
                                        contentRight={null}
                                        onClick={handleShareEvent}
                                    />
                                    <OptionsListItem
                                        label={"Copy location"}
                                        contentLeft={<IconCopy />}
                                        contentRight={null}
                                        onClick={handleCopyLocation}
                                    />
                                    {
                                        event.participationType === EventParticipationType.ATTENDING && (
                                            <OptionsListItem
                                                label={"Cancel reservation"}
                                                contentLeft={<IconExit />}
                                                contentRight={null}
                                                variant={"danger"}
                                                onClick={handleCancelTicketReservation}
                                            />
                                        )
                                    }
                                </OptionsList>
                            </Section>

                            <Section container>
                                <OptionsList>
                                    <OptionsListItem
                                        label={"View profile"}
                                        contentLeft={<IconProfile />}
                                        contentRight={null}
                                        href={"/profile"}
                                    />
                                    <OptionsListItem
                                        label={"Report"}
                                        contentLeft={<IconReport />}
                                        contentRight={null}
                                        variant={"danger"}
                                        onClick={handleReport}
                                    />
                                </OptionsList>
                            </Section>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    );
};
