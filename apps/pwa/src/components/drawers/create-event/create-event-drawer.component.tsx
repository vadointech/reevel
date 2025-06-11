"use client";

import { Children, ComponentProps, ReactNode, useCallback, useRef } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/_redesign/bottom-sheet";

import { Header, OptionsList, OptionsListItem } from "@/components/shared/_redesign";
import { IBottomSheetRootController } from "@/components/shared/_redesign/bottom-sheet/types";

import styles from "./styles.module.scss";

export namespace CreateEventDrawer {
    export type Props = ComponentProps<"div"> & {
        children: ReactNode;
    };
}

export const CreateEventDrawer = ({ children }: CreateEventDrawer.Props) => {
    const controller = useRef<IBottomSheetRootController>(null);

    const handleClick = useCallback(() => {
        controller.current?.close();
    }, []);

    return (
        <BottomSheetRoot
            externalController={controller}
            snapPoints={["fit-content"]}
            fadeThreshold={0}
        >
            <BottomSheetTrigger>
                {children}
            </BottomSheetTrigger>
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
