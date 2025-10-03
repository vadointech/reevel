"use client";

import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useEditProfileFormContext } from "@/features/profile/edit/edit-profile-form.context";
import { useSessionContext } from "@/features/session";
import { updateProfileAction } from "@/features/profile/actions";
import { ObjectDiff } from "@/utils/object";
import { UpdateProfile } from "@/api/profile";

export function useProfileUpdate() {
    const router = useRouter();
    const session = useSessionContext();
    const form = useEditProfileFormContext();

    const updateProfileMutation = useMutation({
        mutationFn: updateProfileAction,
        onSuccess: (data) => {
            if (!data) return;

            session.updateSession({
                profile: data,
            });

            form.store.setFormValues(form.getValues());

            router.push("/profile");
        },
        onError: (error) => {
            console.error("Failed to update profile:", error);
        },
    });

    const handleSubmit = useCallback(() => {
        const diff = new ObjectDiff(
            form.store.formValues,
            form.getValues(),
        );

        if (!diff.hasChanges) {
            router.push("/profile");
            return;
        }

        const {
            location,
            interests,
            avatar,
            ...changedData
        } = diff.toObject();

        const profileToUpdate: UpdateProfile.TInput = {
            ...changedData,
            picture: avatar,
        };

        if (location) {
            profileToUpdate.placeName = location.displayName;
            profileToUpdate.locationCenter = [
                location.location.longitude,
                location.location.latitude,
            ];
            profileToUpdate.locationBbox = location.bbox;
        }

        if (interests) {
            profileToUpdate.interests = interests.map(item =>
                typeof item === "string" ? item : item.slug,
            );
        }

        updateProfileMutation.mutate(profileToUpdate);
    }, [form, router, updateProfileMutation]);

    return {
        handleSubmit,
        isUpdating: updateProfileMutation.isPending,
    };
}