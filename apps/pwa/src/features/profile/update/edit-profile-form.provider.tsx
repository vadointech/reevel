"use client";

import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMobxStore } from "@/lib/mobx";

import { editProfileFormSchema, EditProfileFormSchemaValues } from "./edit-profile-form.schema";
import { EditProfileFormContext } from "./edit-profile-form.context";
import { EditProfileFormStore } from "./edit-profile-form.store";
import { GetCurrentUserProfileQuery } from "@/features/profile/queries";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileLocationMapper } from "@/features/profile/mappers";

export const EditProfileFormProvider = ({ children }: PropsWithChildren) => {
    const store = useMobxStore(EditProfileFormStore);
    const form = useForm<EditProfileFormSchemaValues>({
        resolver: zodResolver(editProfileFormSchema),
        mode: "onChange",
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.fetchQuery(GetCurrentUserProfileQuery())
            .then(profile => {
                const formValues: EditProfileFormSchemaValues = {
                    background: "",
                    avatar: profile?.picture || "/assets/defaults/avatar.png",
                    fullName: profile?.fullName || "",
                    bio: profile?.bio || "",
                    interests: profile?.interests?.map(item => item.interest) || [],
                    location: profile?.location
                        ? ProfileLocationMapper.toPlaceLocationEntity(profile.location)
                        : undefined,
                };
                form.reset(formValues);
                store.setFormValues(formValues);
                store.setPictureToSelect(formValues.avatar);
            })
            .finally(() => store.setLoading(false));
    }, []);

    return (
        <FormProvider {...form}>
            <EditProfileFormContext.Provider value={{ ...form, store }}>
                { children }
            </EditProfileFormContext.Provider>
        </FormProvider>
    );
};