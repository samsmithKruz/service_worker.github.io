const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    'faq.html',
    './css/styles.css',
    './js/app.js'

];
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("service worker caching files");
                cache.addAll(cacheAssets);
            }).then(() => self.skipWaiting())
    );
    console.log('Service worker: installed');
})
self.addEventListener("activate", (e) => {
    console.log('Service worker: activated');
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log("Clearing old cache");
                            return caches.delete(cache);
                        }
                    })
                )
            })
    );
})
self.addEventListener("fetch",e=>{
    console.log('service worker fetching');
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})