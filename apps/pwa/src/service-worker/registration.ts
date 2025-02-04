export default async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
    return await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
        updateViaCache: "none",
    });
}