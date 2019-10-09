const cacheName = 'cache-v1';
const cacheResources = [
    '/',
    '/index.html',
    '/script.js',
    /*'https://fonts.googleapis.com/css?family=Playfair+Display&display=swap',
    'https://fonts.gstatic.com/s/playfairdisplay/v15/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2'
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css'*/,
    '/node_modules/font-awesome/css/font-awesome.min.css'
];

self.addEventListener('install', e => {
    //self.skipWaiting();
    // 
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheResources).catch(err => console.log("REEREER", err));
        })
    )
});

/*self.addEventListener('activate', e => {
    self.clients.claim();
    console.log("Activado y esperando");
})*/

self.addEventListener('fetch', e => {
    console.log(e.request.url, e.request.headers.get('accept'), e.request.mode);
    const url = new URL(e.request.url);
    if (e.request.headers.get('accept').includes('text/css') && url.hostname.includes('fontawesome.com')) {
        e.respondWith(
            caches.match('/node_modules/font-awesome/css/font-awesome.min.css')
        );
    } else {
        e.respondWith(
            caches.open(cacheName).then(cache => {
                return cache.match(e.request).then(resp => {
                    if (resp) {
                        console.log("Está en el caché:", e.request.url);
                        return resp;
                    } else {
                        console.log("No está en el caché:", e.request.url);
                        return fetch(e.request).then(resp => {
                            console.log(resp);
                            cache.add(e.request).catch(err => console.log("Error en el add:", err, e.request.url));
                            return resp;
                        }).catch(err => console.log("Error en el fetch:", err))
                    }
                })
            })
        )
    }
})