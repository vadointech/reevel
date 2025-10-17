"use client";

import { ComponentProps } from "react";
import { observer } from "mobx-react-lite";
import { useSessionContext } from "@/features/session";
import { Avatar, AvatarSkeleton } from "@/components/ui";
import { Link } from "@/i18n/routing";

export namespace SessionAvatar {
    export type Props = ComponentProps<"a">;
}

export const SessionAvatar = observer(({ ...props }: SessionAvatar.Props) => {
    const session = useSessionContext();

    if(session.store.loading) {
        return <AvatarSkeleton />;
    }

    if(session.store.authenticated) {
        return (
            <Link href={"/profile"} {...props as any}>
                <Avatar image={session.store.user?.profile.picture} />
            </Link>
        );
    }

    return null;
});
