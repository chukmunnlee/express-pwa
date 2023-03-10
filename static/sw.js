const cacheName = 'mycache'

const assets = [
	'/favicon.ico',
	'/manifest.json',
	'/placeholder.png',
	'/polar-bear.png',
	'/unplugged.png',
	'/dov-bear.gif',
	'/styles.css',
	'/offline.html',
	'/icon/android-icon-192x192-seochecker-manifest-6612.png',
	'/icon/apple-icon-114x114-seochecker-manifest-6612.png',
	'/icon/apple-icon-120x120-seochecker-manifest-6612.png',
	'/icon/apple-icon-144x144-seochecker-manifest-6612.png',
	'/icon/apple-icon-152x152-seochecker-manifest-6612.png',
	'/icon/apple-icon-180x180-seochecker-manifest-6612.png',
	'/icon/apple-icon-57x57-seochecker-manifest-6612.png',
	'/icon/apple-icon-60x60-seochecker-manifest-6612.png',
	'/icon/apple-icon-72x72-seochecker-manifest-6612.png',
	'/icon/apple-icon-76x76-seochecker-manifest-6612.png',
	'/icon/favicon-16x16-seochecker-manifest-6612.png',
	'/icon/favicon-32x32-seochecker-manifest-6612.png',
	'/icon/favicon-96x96-seochecker-manifest-6612.png'
]

// Install cache
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName)
			.then (cache => cache.addAll(assets))
	)
})

// Network first, callback to cache
self.addEventListener('fetch', (event) => {

	const request = event.request

	console.info('>>>> event ', event)
	console.info('>>>> request.url ', request.url)

	// If we're loading the page
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request)
				.then(response => {
					const copy = response.clone()
					event.waitUntil(
						caches.open(cacheName)
							.then(cache => cache.put(request, copy))
					)
					return response
				})
				.catch(() => 
					caches.match(request)
						.then(cacheReq => {
							if (!!cacheReq)
								return cacheReq
							return caches.match('/offline.html')
						})
				)
		)
		return 
	}

	// If it is in the cache, serve from cache
	if (assets.find(a => !!request.url.endsWith(a))) {
		console.info('>>>> fetching from cache: ', request.url)
		event.respondWith(
			caches.match(request)
				.then(request => request)
		)
		return 
	}

	// Go to the network
	console.info('>>> fetching from network')
	event.respondWith(
		fetch(request)
			.then(response => {
				if (request.url.startsWith('http')) {
					const copy = response.clone()
					// Cache a copy
					event.waitUntil(
						caches.open(cacheName)
							.then(cache => cache.put(request, copy))
					)
				}
				return response
			})
			.catch(error => {
				// Try locating the request from cache
				caches.match(request)
					.then(cacheResp => {
						// return from catch if we find it
						if (!!cacheResp)
							return cacheResp
						// If it is image then 
						if (request.headers.get('Accept').includes('image/'))
							return caches.match('/placeholder.png')

						// Create a response 
						return new Response(`Error: cannot load ${request.url}`, { 
							status: 404, 
							statusText: "Not found", 
							headers: { 'Content-Type': 'text/plain' } 
						})
					})
			})
	)
})

	// Network first
/*
	if (request.headers.get('Accept').includes('text/html'))
		event.respondWith(
			fetch(request)
				.then((response) => {
					// Cache result
					const copy = response.clone()
					event.waitUntil(
						caches.open(cacheName)
							.then(cache => cache.put(request, copy))
					)
					return response
				})
				.catch(() => 
					caches.match(request)
						.then(resp => resp || caches.match("/offline.html"))
				)
		)
})
*/
