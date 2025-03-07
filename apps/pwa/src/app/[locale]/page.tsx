"use client";

import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { useSessionStore } from "@/features/session";
import { observer } from "mobx-react-lite";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Cropper, CropperTrigger } from "@/components/uploader/cropper";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/upload";
import { useCallback } from "react";
import { Button } from "@/components/ui";

export default observer(function Home() {

    const t = useTranslations();

    const sessionStore = useSessionStore();

    const { mutate } = useMutation({
        mutationFn: uploadFile,
    });

    const handleUpload = useCallback((file: Blob) => {
        mutate({ body: { file: file } });
    }, []);

    return (
        <div>

            <Image
                width={100}
                height={100}
                src={sessionStore.user?.profile.picture || ""}
                alt={""}
            />


            <Cropper
                onCropCompleted={handleUpload}
            >
                <CropperTrigger>
                    <Button>
                        Crop me
                    </Button>
                </CropperTrigger>
            </Cropper>

            <Drawer>
                <DrawerTrigger>
                    <br />
                    <Link href={"/onboarding/photo"}>
                        Session: { sessionStore.user?.id } { sessionStore.user?.email }
                    </Link>
                </DrawerTrigger>
                <DrawerBody>
                    <div>
                        tabs
                    </div>
                    <DrawerContent>
                        Next.js | {t("Index.title")}
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
});
