
(function () {
  'use strict';
  const version = "1.16.10";
  const staticCacheName = "kejar-${version}";
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(staticCacheName).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/bootstrap.css',
          '/css/style.css',
          '/js/jquery-3.3.1.js',
          '/js/bootstrap.js',
          '/img/avat1.png',
          '/img/exl.png',
          '/img/logo.png',
          '/404.html',
          '/project/add2numbers/add2numbers.js',
          '/project/add2numbers/index.html',
          '/project/css-grid/index.html',
          '/project/css-grid/style.css',
          '/project/css-grid/img/avat1.png',
          '/project/css-grid/img/google.png',
          '/project/css-grid/img/logo.png',
          '/project/Leaflet-Mapbox/index.html',
          '/project/Leaflet-Mapbox/css/bootstrap.css',
          '/project/Leaflet-Mapbox/css/style.css',
          '/project/Leaflet-Mapbox/js/bootstrap.js',
          '/project/Leaflet-Mapbox/js/jquery3.js',
          '/project/Leaflet-Mapbox/js/main.js',
          '/project/Leaflet-Mapbox/img/pin.png',
          '/project/Leaflet-Mapbox/img/ad.jpg',
          '/project/Leaflet-Mapbox/img/ugm.jpg',
          '/project/Leaflet-Mapbox/img/amikom.jpg',
          '/project/Leaflet-Mapbox/img/ambarukmo.jpg',
        ])
          .then(() => self.skipWaiting());
      })
    );
  });

  self.addEventListener('fetch', function (event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function (response) { //kalau url yg diminta tidak ada maka tampilkan 404
          if (response.status === 404) {
            return caches.match('404.html');
          }
          return caches.open(staticCacheName).then(function (cache) { // menambahkan ke cache jika belum terdaftar di local cache
            if (event.request.url.indexOf('test') < 0) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          });
        });
      }).catch(function (error) {
        console.log('Error, ', error);
        return caches.match('404.html');
      })
    );
  });

  self.addEventListener('activate', function (event) {
    console.log('Activating new service worker...');

    var cacheWhitelist = [staticCacheName];

    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
})();