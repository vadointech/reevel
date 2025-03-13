class ServiceWorkerService {
    async register(scriptURL: string | URL, options: RegistrationOptions = {}) {
        return this.withServiceWorker((serviceWorker) => {
            return serviceWorker.register(scriptURL, {
                scope: "/",
                updateViaCache: "none",
                ...options,
            });
        });
    }

    postMessage<T extends { type: string, payload: unknown }>(message: T) {
        return this.withServiceWorker((serviceWorker) => {
            if(serviceWorker.controller) {
                serviceWorker.controller.postMessage(message);
            }
        });
    }

    get serviceWorker() {
        if("serviceWorker" in navigator && navigator.serviceWorker) return navigator.serviceWorker;
        return null;
    }

    private withServiceWorker<T>(func: (serviceWorker: ServiceWorkerContainer) => T): T | null {
        if(this.serviceWorker) {
            return func(this.serviceWorker);
        }
        return null;
    }
}

export const serviceWorkerService = new ServiceWorkerService();