const cacheName = 'mycache'

const assets = [
	'/favicon.ico',
	'/manifest.json',
	'/placeholder.png',
	'/polar-bear.png',
	'/styles.css',
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
self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(cacheName)
			.then (cache => {
				return cache.addAll(assets)
				/*
				const proms = []
				assets.forEach(v => 
					proms.push(cache.add(v)
						.catch(f => console.error(`File error: ${f}`))
					)
				)
				return Promise.all(proms)
				*/
			}
		)
	)
})


