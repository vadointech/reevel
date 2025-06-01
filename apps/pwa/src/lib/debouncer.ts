export class RequestDebouncer {
    private timeout: NodeJS.Timeout | null = null;
    private controller: AbortController | null = null;

    async debounceRequest<T>(
        requestFn: (signal?: AbortSignal) => Promise<T>,
        delayMs: number = 500,
    ): Promise<T> {
        // Cancel previous request
        this.cancel();

        this.controller = new AbortController();
        const controller = this.controller;

        return new Promise<T>((resolve, reject) => {
            this.timeout = setTimeout(async() => {
                this.timeout = null;

                if (controller.signal.aborted) {
                    reject(new Error("Request cancelled"));
                    return;
                }

                try {
                    const result = await requestFn(controller.signal);
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    if (this.controller === controller) {
                        this.controller = null;
                    }
                }
            }, delayMs);
        });
    }

    cancel(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.controller) {
            this.controller.abort();
            this.controller = null;
        }
    }

    get isPending(): boolean {
        return this.timeout !== null;
    }
}