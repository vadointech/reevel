import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";

export const dynamic = "force-dynamic";

export default async function EventLayout({ children }: PropsWithChildren<ParamsWithLocale>) {
    return children;
}