

// imports
importScripts('sw-utils.js');


const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
  '/',
  'index.html',
  'styles.css',
  'main.js',
  'sw.js',
  'database.js',
  'manifest.json',
  'sw-utils.js',
  'image/icon-192x192.png',
  'image/icon-256x256.png',
  'image/icon-384x384.png',
  'image/icon-512x512.png',
];

const APP_SHELL_INMUTABLE = [
  'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});




self.addEventListener( 'fetch', e => {
  let respuesta;
  
  if(e.request.url.includes('/api')){
    respuesta = manejoApiReservacion(DYNAMIC_CACHE, e.request);
  }else{
   respuesta = caches.match( e.request ).then( res => {

      if ( res ) {

        actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
          return res;
      } else {

          return fetch( e.request ).then( newRes => {

              return updateCacheDynamic( DYNAMIC_CACHE, e.request, newRes );

          });

      }

  });
  }


    



    e.respondWith( respuesta );

});


