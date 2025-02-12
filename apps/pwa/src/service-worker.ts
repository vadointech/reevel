//=============== Configuration ===============//
const VERSION = 1;
const CACHE = false;

const RUNTIME = {
    NAME: "runtime",
};

const PRECACHE = {
    NAME: "precache-v" + VERSION,
    URLS: [
        "/vercel.svg",
    ],
    ROUTES: [
        "/",
        "/en",
        "/login",
        "/onboarding/photo",
    ],
};
//=============================================//

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheManager.getPrecacheUrls()
            .then(() => caches.open(PRECACHE.NAME))
            .then(cache => {
                if(CACHE) {
                    cache.addAll(
                        PRECACHE.URLS.map(item => encodeURI(item)),
                    );
                }
            })
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    console.log("activate");
    event.waitUntil(
        cacheManager.clearCache()
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event: FetchEvent) => {
    const request = event.request;
    const requestUrl = new URL(request.url);

    // Skip cross-origin requests, like those for Google Analytics.
    if(!request.url.startsWith(self.location.origin)) return;

    if(request.method === "GET") {

        // Handle precached requests
        if(PRECACHE.URLS.includes(requestUrl.pathname)) {
            return event.respondWith(strategies.cacheFirst(request));
        }

        // Handle Next Images
        if(requestUrl.pathname.startsWith("/_next/image")) {
            return event.respondWith(
                strategies.networkFirst(request, (error) => {
                    const dynamicUrl = requestUrl.searchParams.get("url");

                    if(dynamicUrl) {
                        const precachedUrl = new URL(dynamicUrl, requestUrl);

                        return caches.match(precachedUrl)
                            .then(cache => {
                                if(cache) return cache;
                                return error;
                            });
                    }

                    return error;
                }),
            );
        }

        // Handle other GET requests
        return event.respondWith(strategies.cacheFirst(request, RUNTIME.NAME));

    }

    event.respondWith(fetch(request));
});















//=============== Implementation ===============//
const strategies = {
    async cacheFirst(request: Request, cacheName: string = PRECACHE.NAME) {
        return caches.match(request)
            .then(cache => {
                if(cache) return cache;
                return fetch(request)
                    .then(response => {
                        cacheManager.saveToCache({
                            request,
                            response,
                            cacheName,
                        });
                        return response;
                    });
            });
    },
    async networkFirst(request: Request, fallback?: (e: any) => Response) {
        return fetch(request)
            .then(response => {
                if(request.method === "GET") {
                    cacheManager.saveToCache({
                        request,
                        response,
                        cacheName: RUNTIME.NAME,
                    });
                }
                return response;
            })
            .catch(error => {
                if(fallback) return fallback(error);
                return caches.match(request)
                    .then(cache => {
                        if(cache) return cache;
                        return error;
                    });
            });
    },
};

const cacheManager = {
    async clearCache() {
        const currentCache = [PRECACHE.NAME, RUNTIME.NAME];

        return caches.keys()
            .then(cache => {
                return cache.filter(key => !currentCache.includes(key));
            })
            .then(cacheToDelete => {
                return Promise.all(
                    cacheToDelete.map(key => caches.delete(key)),
                );
            });
    },
    saveToCache({ request, response, cacheName }: {
        request: Request,
        response: Response,
        cacheName: string
    }) {
        if(CACHE) {
            const responseClone = response.clone();
            caches.open(cacheName)
                .then(cache => {
                    cache.put(request, responseClone);
                });
        }
    },
    async getPrecacheUrls() {
        return fetch("/next-static.json")
            .then(response => response.json())
            .then(urls => {
                PRECACHE.URLS = [
                    ...PRECACHE.ROUTES,
                    ...PRECACHE.URLS,
                    ...urls,
                ];
                return PRECACHE.URLS;
            });
    },
};
//=============================================//