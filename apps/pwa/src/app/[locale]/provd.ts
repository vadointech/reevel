"use client";

import { createStoreProvider } from "@/lib/store-provider";

type HomepageStore = {
    title: string;
    sub: string;
    update: (data: string) => void;
};



export const [HomePageContext, useHomePageContext] = createStoreProvider<HomepageStore, "title">((set) => ({
    sub: "Simba",
    update: (data: string) => set(() => ({ title: data })),
}));
