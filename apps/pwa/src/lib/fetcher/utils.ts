import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function getHeadersConfig(headers: ReadonlyHeaders) {
    const headersObj: Record<string, string> = {};
    for(const [key, value] of headers.entries()) {
        headersObj[key] = value;
    }

    return headersObj;
}