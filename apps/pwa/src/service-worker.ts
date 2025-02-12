//=============== Configuration ===============//
const VERSION = 1;
const CACHE = true;

// In milliseconds
const
    SECOND = 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24;

const CACHE_TIMESTAMP_KEY = "sw-cache-date";

const RUNTIME = {
    NAME: "runtime",
    TTL: DAY,
    INVALIDATED_AT: Date.now(),
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

        // event.waitUntil(cacheManager.invalidateCache());

        // Handle precached requests
        if(PRECACHE.URLS.includes(requestUrl.pathname)) {
            return event.respondWith(
                strategies.cacheFirst(request, PRECACHE.NAME),
            );
        }

        // Handle Next Images
        if(requestUrl.pathname.startsWith("/_next/image")) {
            return event.respondWith(
                strategies.cacheFirst(request, RUNTIME.NAME, (error) => {
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
    async cacheFirst(request: Request, cacheName: string, fallback?: (error: any) => Response) {
        return caches.match(request)
            .then(cache => {
                if(cache) {
                    return cache;
                } else {
                    return fetch(request)
                        .then(response => {
                            return cacheManager.saveToCache({
                                request,
                                response,
                                cacheName,
                            });
                        });
                }
            })
            .catch(fallback)
            .finally(cacheManager.invalidateCache);
    },
    async networkFirst(request: Request, cacheName: string, fallback?: (error: any) => Response){
        return fetch(request)
            .then(response => {
                return cacheManager.saveToCache({
                    request,
                    response,
                    cacheName,
                });
            })
            .catch(error => {
                return caches.match(request)
                    .then(cache => {
                        if(cache) return cache;
                        throw new Error(error);
                    });
            })
            .catch(fallback)
            .finally(cacheManager.invalidateCache);
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
    async saveToCache({ request, response, cacheName }: {
        request: Request,
        response: Response,
        cacheName: string
    }) {

        let responseClone = response.clone();

        responseClone = this.attachTimestamp(responseClone);

        if(CACHE) {
            caches.open(cacheName)
                .then(cache => {
                    cache.put(request, responseClone);
                });
        }

        return response;
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

    attachTimestamp(response: Response) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers({
                ...response.headers,
                [CACHE_TIMESTAMP_KEY]: new Date().toISOString(),
            }),
        });
    },

    async invalidateCache() {
        const now = Date.now();

        if(now - RUNTIME.INVALIDATED_AT > RUNTIME.TTL) {
            const cache = await caches.open(RUNTIME.NAME);
            const keys = await cache.keys();

            for (const request of keys) {
                const response = await cache.match(request);
                if(!response) continue;

                const cacheDate = response.headers.get("sw-cache-date");
                if(!cacheDate) continue;

                const cachedDate = new Date(cacheDate);

                if (now - cachedDate.getTime() > RUNTIME.TTL) {
                    await cache.delete(request);
                }
            }

            RUNTIME.INVALIDATED_AT = now;
        }
    },
};
//=============================================//