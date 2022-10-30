const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_LIMIT = 50;

const clearCache = (cacheName: string, numberOfItems: number) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > numberOfItems) {
        cache.delete(keys[0]).then(() => clearCache(cacheName, numberOfItems));
      }
    });
  });
};

const APP_SHELL = [
  "/",
  "/index.html",
  "/assistant.html",
  "/assets/styles.css",
  // "/img/main.jpg",
  "/index.js",
  "/assistant.js",
  "/js/renderList.js",
  "/js/showAlertMessage.js",
  "/js/showYear.js",
];

self.addEventListener("install", (e: any) => {
  const cacheProm = caches
    .open(CACHE_STATIC_NAME)
    .then((cache) => {
      return cache.addAll([]);
    })
    .catch((err: any) => {
      console.log(err);
    });

  e.waitUntil(Promise.all([cacheProm]));
});

self.addEventListener("activate", (e: any) => {
  const res = caches
    .keys()
    .then((keys) => {
      keys.forEach((key) => {
        if (key !== CACHE_STATIC_NAME && key.includes("static"))
          return caches.delete(key);
      });
    })
    .catch((err: any) => {
      console.log(err);
    });

  e.waitUntil(res);
});

self.addEventListener("fetch", (e: any) => {
  const response = caches.match(e.request).then((res: any) => {
    if (res) return res;

    return fetch(e.request)
      .then((newResp) => {
        caches.open(CACHE_STATIC_NAME).then((cache) => {
          cache.put(e.request, newResp);
          clearCache(CACHE_STATIC_NAME, CACHE_DYNAMIC_LIMIT);
        });
        return newResp.clone();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // const response = caches
  //   .open(CACHE_STATIC_NAME)
  //   .then((cache) => {
  //     fetch(e.request).then((newResp) => {
  //       cache.put(e.request, newResp);
  //     });
  //     return cache.match(e.request);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  e.respondWith(response);
});
