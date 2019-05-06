var CACHE_NAME = "Restaurat-Review-App-Udacity";

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            self.currentCache = cache;
            return cache.addAll([
                'index.html',
                'restaurant.html',
                'css/styles.css',
                'css/styles-rest.css',
                'css/media.css',
                'css/media-rest.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'data/restaurants.json',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/rest.jpg'
            ]);
        }).catch((err) => {
            console.log("error in load files in cache", err);
        })
    );
});

self.addEventListener('fetch', (evt) => {

    evt.respondWith(
        caches.match(evt.request).then((response) => {

            if (response) {
                return response;
            } else {
                return fetch(evt.request).then((response) => {
                    return response;
                }).catch((err) => {
                    console.log('Fetching failed', err);
                });
            }
        })
    );

    caches.match(evt.request).then((response) => {
        if (!response) {
            fetch(evt.request).then((response) => {
                self.currentCache.put(evt.request, response);
            });
        }
    });

});