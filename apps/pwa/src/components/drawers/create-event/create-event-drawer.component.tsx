"use client";

import { ReactNode, useCallback, useRef } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/bottom-sheet";

import { Header, OptionsList, OptionsListItem } from "@/components/ui";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";

import styles from "./styles.module.scss";

export namespace CreateEventDrawer {
    export type Props = BottomSheetTrigger.Props & {
        children: ReactNode;
    };
}

export const CreateEventDrawer = (props: CreateEventDrawer.Props) => {
    const controller = useRef<IBottomSheetRootController>(null);

    const handleClick = useCallback(() => {
        controller.current?.close();
    }, []);

    return (
        <BottomSheetRoot
            externalController={controller}
            snapPoints={["fit-content"]}
            fadeThreshold={0}
            zIndex={40}
        >
            <BottomSheetTrigger {...props} />
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.handle}>
                            <Header size={"large"}>
                                How to set up your event?
                            </Header>
                        </BottomSheetHandle>

                        <div className={styles.cards}>
                            <OptionsList>
                                <OptionsListItem
                                    href={"/event/public/create"}
                                    weight={"bold"}
                                    label={"Public Event"}
                                    contentLeft={"🌍"}
                                    description={"Visible to everyone and can be discovered in search."}
                                    onClick={handleClick}
                                />
                            </OptionsList>

                            <OptionsList>
                                <OptionsListItem
                                    href={"/event/private/create"}
                                    weight={"bold"}
                                    label={"Private Event"}
                                    contentLeft={"🔒"}
                                    description={"Only accessible via a direct link — not shown publicly."}
                                    onClick={handleClick}
                                />
                            </OptionsList>
                        </div>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
