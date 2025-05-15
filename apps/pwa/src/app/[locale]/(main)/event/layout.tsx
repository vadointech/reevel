import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";

export const dynamic = "force-dynamic";

export default async function CreateEventLayout({ children }: PropsWithChildren<ParamsWithLocale>) {
    return children;
}