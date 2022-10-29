"use strict";
const CACHE_STATIC_NAME = "static-v6";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_IMMUTABLE_NAME = "immutable-v1";
const CACHE_DYNAMIC_LIMIT = 50;
const clearCache = (cacheName, numberOfItems) => {
    caches.open(cacheName).then((cache) => {
        return cache.keys().then((keys) => {
            if (keys.length > numberOfItems) {
                cache.delete(keys[0]).then(() => clearCache(cacheName, numberOfItems));
            }
        });
    });
};
self.addEventListener("install", (e) => {
    const cacheProm = caches
        .open(CACHE_DYNAMIC_NAME)
        .then((cache) => {
        return cache.addAll([
            "/",
            "/index.html",
            "/todo.html",
            "/assets/styles.css",
            // "/img/main.jpg",
            "/index.js",
            "/todo.js",
            "/utils/renderList.js",
            "/utils/showAlertMessage.js",
            "/utils/showYear.js",
        ]);
    })
        .catch((err) => {
        console.log(err);
    });
    // const cacheImmutable = caches
    //   .open(CACHE_IMMUTABLE_NAME)
    //   .then((cache) => cache.add(""));
    e.waitUntil(Promise.all([cacheProm]));
});
self.addEventListener("activate", (e) => {
    const res = caches
        .keys()
        .then((keys) => {
        keys.forEach((key) => {
            if (key !== CACHE_STATIC_NAME && key.includes("static"))
                return caches.delete(key);
        });
    })
        .catch((err) => {
        console.log(err);
    });
    e.waitUntil(res);
});
self.addEventListener("fetch", (e) => {
    const response = caches.match(e.request).then((res) => {
        if (res)
            return res;
        return fetch(e.request)
            .then((newResp) => {
            caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                cache.put(e.request, newResp);
                clearCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
            });
            return newResp.clone();
        })
            .catch((err) => {
            console.log(err);
        });
    });
    e.respondWith(response);
});
