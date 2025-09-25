const CACHE_NAME = 'cache-v2';
const STATIC_ASSETS = [
  '/index.html',     
  '/style.css',      
  '/src/controllers/script.js',  
  '/public/hunter.jpg',
  '/public/hunter.gif',
  '/public/naruto.jpg',
  '/public/demon.jpg',
  '/public/attack.jpg',

];



// Instalación y cache inicial
self.addEventListener('install', event => {
  console.log('SW Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW Cacheando archivos estáticos...');
        // cachear solo los archivos que existan
        return Promise.all(
          STATIC_ASSETS.map(url =>
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error al obtener ${url}`);
                }
                return cache.put(url, response);
              })
              .catch(err => {
                console.warn(err.message);
              })
          )
        );
      })
  );
  self.skipWaiting();
});

// Activación y limpieza de caches antiguas
self.addEventListener('activate', event => {
  console.log('SW Activado');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('SW Eliminando cache antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de fetch (Cache First con fallback)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // fallback si falla la red y es documento
          if (event.request.destination === 'document') {
            return caches.match('index.html');
          }
        });
    })
  );
});