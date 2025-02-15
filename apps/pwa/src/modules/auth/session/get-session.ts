"use server";

import { ClientSession } from "@/types/session";

export async function getSession(): Promise<ClientSession | null> {
    try {
        const response = await fetch("http://localhost:3001/api/user/me");
        return await response.json();
    } catch {
        return null;
    }
}