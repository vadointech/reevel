"use server";

import { ClientSession } from "@/types/session";

export async function getSession(): Promise<ClientSession | null> {
    try {
        // TODO: Fetch user session
        return null;
    } catch {
        return null;
    }
}