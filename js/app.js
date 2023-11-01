if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("../cached_site.js",{scope:"/"})
            .then(reg => console.log('Service worker: Registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}