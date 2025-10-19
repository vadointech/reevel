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

import styles from "../styles.module.scss";
import cx from "classnames";
import { ReportDrawer } from "@/components/drawers/report";
import { useQuery } from "@tanstack/react-query";
import { GetEventParticipationStatusQuery } from "@/features/event/queries";
import { useSessionContext } from "@/features/session";

export namespace EventMoreActionsDrawer {
    export type Props = PropsWithChildren<EventEntity>;
}

export const EventMoreActionsDrawer = ({
    children,
    ...event
}: EventMoreActionsDrawer.Props) => {
    const session = useSessionContext();

    const { data: participationInfo } = useQuery({
        ...GetEventParticipationStatusQuery(event.id),
        enabled: session.store.authenticated,
        placeholderData: {
            eventId: event.id,
            participationStatus: null,
        },
    });

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
                                        participationInfo?.participationStatus === EventParticipationType.ATTENDING && (
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
