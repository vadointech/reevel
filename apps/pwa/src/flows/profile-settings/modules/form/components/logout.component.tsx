"use client";

import { OptionsList, OptionsListItem } from "@/components/ui";
import { IconExit } from "@/components/icons";
import { useLogout } from "@/features/session/hooks";

export namespace ProfileSettingsLogout {
    export type Props = never;
}

export const ProfileSettingsLogout = () => {
    const { handleLogout } = useLogout();

    return (
        <OptionsList>
            <OptionsListItem
                variant={"danger"}
                label={"Log out"}
                contentLeft={<IconExit />}
                contentRight={false}
                onClick={handleLogout}
            />
        </OptionsList>
    );
};
