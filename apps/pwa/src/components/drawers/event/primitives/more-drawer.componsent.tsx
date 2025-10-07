import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle,
    BottomSheetPortal, BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/bottom-sheet";
import { IconCopy, IconExit, IconProfile, IconQRCode, IconReport, IconShare } from "@/components/icons";
import { Section } from "@/components/sections";
import { OptionsList, OptionsListItem } from "@/components/ui";
import { PropsWithChildren, useRef } from "react";

import { useTicketReservation } from "@/features/event/booking/hooks";
import { EventParticipationType } from "@/entities/event";
import { useRouter } from "@/i18n/routing";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace EventMoreActionsDrawer {
    export type Props = PropsWithChildren<{
        eventId: string;
        participationType: EventParticipationType | null;
    }>;
}

export const EventMoreActionsDrawer = ({
    children,
    eventId,
    participationType,
}: EventMoreActionsDrawer.Props) => {
    const router = useRouter();
    const bottomSheetController = useRef<IBottomSheetRootController | null>(null);

    const {
        handleCancelTicketReservation,
    } = useTicketReservation(
        eventId,
        {
            onTicketCancelled: () => {
                bottomSheetController.current?.close();
                router.refresh();
            },
        },
    );

    return (
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
                        <BottomSheetHandle></BottomSheetHandle>
                        <Section container className={styles.moreDrawer__gap}>
                            <OptionsList>
                                <OptionsListItem
                                    label={"Share event"}
                                    contentLeft={<IconShare />}
                                    contentRight={null}
                                />
                                <OptionsListItem
                                    label={"Copy location"}
                                    contentLeft={<IconCopy />}
                                    contentRight={null}
                                />
                                {
                                    participationType === EventParticipationType.ATTENDING && (
                                        <OptionsListItem
                                            label={"Cancel reservation"}
                                            contentLeft={<IconExit />}
                                            contentRight={null}
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
                                />
                                <OptionsListItem
                                    label={"QR code"}
                                    contentLeft={<IconQRCode />}
                                    contentRight={null}
                                />
                                <OptionsListItem
                                    label={"Report"}
                                    contentLeft={<IconReport />}
                                    contentRight={null}
                                />
                            </OptionsList>
                        </Section>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
