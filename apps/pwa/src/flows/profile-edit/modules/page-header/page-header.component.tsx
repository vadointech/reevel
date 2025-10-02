"use client";

import { Link } from "@/i18n/routing";
import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui";
import { useProfileUpdate } from "@/features/profile/edit/hooks";

import styles from "./styles.module.scss";

export function EditProfileFormHeader() {
    const { handleSubmit, isUpdating } = useProfileUpdate();

    return (
        <Header
            iconAfter={
                <Button
                    className={styles.button}
                    loading={isUpdating}
                    variant="text-accent"
                    size="default"
                    onClick={handleSubmit}
                    disabled={isUpdating}
                >
                    Save
                </Button>
            }
            iconBefore={
                <Link href={"/profile"}>
                    <IconArrowLeft />
                </Link>
            }
        >
            Edit profile
        </Header>
    );
}