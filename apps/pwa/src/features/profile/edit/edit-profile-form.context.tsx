"use client";

import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { IEditProfileFormStore } from "./types";
import { EditProfileFormSchemaValues } from "./edit-profile-form.scheme";

export type EditProfileFormContextValues = UseFormReturn<EditProfileFormSchemaValues> & {
    store: IEditProfileFormStore;
};

export const EditProfileFormContext = createContext<EditProfileFormContextValues | null>(null);

export function useEditProfileFormContext() {
    const ctx = useContext(EditProfileFormContext);
    if (!ctx) throw new Error("useEditProfileFormContext must be used within a useEditProfileFormContext");
    return ctx;
}