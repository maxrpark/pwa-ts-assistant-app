"use strict";
const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        // navigator.serviceWorker
        //   .register("/sw.js")
        //   .then((registration) =>
        //     console.log(
        //       `Service Worker registration complete, scope: '${registration.scope}'`
        //     )
        //   )
        //   .catch((error) =>
        //     console.log(`Service Worker registration failed with error: '${error}'`)
        //   );
    }
};
registerServiceWorker();
