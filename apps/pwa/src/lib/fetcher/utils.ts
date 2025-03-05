import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

const omitHeaders = ["next-action", "accept", "content-type", "content-length"];

export function getHeadersConfig(headers: ReadonlyHeaders) {
    const headersObj: Record<string, string> = {};
    for(const [key, value] of headers.entries()) {
        if(!omitHeaders.includes(key)) headersObj[key] = value;
    }

    return headersObj;
}