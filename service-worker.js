var precacheConfig = [
    ['./index.html', '9a54aeb0e77595d85abddab1b75c7427'],
    ['./static/css/main.c9699bb9.css', '67d43955204f0c6a69ab47839b70d355'],
    ['./static/js/main.99348925.js', 'fe07fdf38477f3f427a13d6ac20a830d'],
  ],
  cacheName =
    'my-offline-cache-' + (self.registration ? self.registration.scope : ''),
  cleanResponse = function(t) {
    return t.redirected
      ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function(e) {
          return new Response(e, {
            headers: t.headers,
            status: t.status,
            statusText: t.statusText,
          });
        })
      : Promise.resolve(t);
  },
  createCacheKey = function(e, t, n, r) {
    var a = new URL(e);
    return (
      (r && a.pathname.match(r)) ||
        (a.search +=
          (a.search ? '&' : '') +
          encodeURIComponent(t) +
          '=' +
          encodeURIComponent(n)),
      a.toString()
    );
  },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        a = createCacheKey(r, hashParamName, n, /\.\w{8}\./);
      return [r.toString(), a];
    }),
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(r) {
        return setOfCachedUrls(r).then(function(n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(t) {
              if (!n.has(t)) {
                var e = new Request(t, { credentials: 'same-origin' });
                return fetch(e).then(function(e) {
                  if (!e.ok)
                    throw new Error(
                      'Request for ' +
                        t +
                        ' returned a response with status ' +
                        e.status,
                    );
                  return cleanResponse(e).then(function(e) {
                    return r.put(t, e);
                  });
                });
              }
            }),
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      }),
  );
}),
  self.addEventListener('activate', function(e) {
    var n = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(t) {
          return t.keys().then(function(e) {
            return Promise.all(
              e.map(function(e) {
                if (!n.has(e.url)) return t.delete(e);
              }),
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        }),
    );
  }),
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          console.log(response);
          if (!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(cacheName).then(function(cache) {
            console.log('Adding to cache: ' + event.request.url);
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(function() {
          return caches.match(event.request).then(function(response) {
            console.log('Loading from cache: ' + event.request.url);
            return response;
          });
        }),
    );
  });
