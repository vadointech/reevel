import { ChangeEvent, useCallback } from "react";

type Params = {
    onFileSelected?: (src: string) => void;
};

export function useFileSelect(params: Params = {}) {
    return useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const src = reader.result?.toString() || "";
                params.onFileSelected?.(src);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);
}