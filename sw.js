const CACHE_NAME = 'fcards-v3';
const FILES = ['index.html', 'manifest.json'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      return response || fetch(e.request);
    })
  );
});
