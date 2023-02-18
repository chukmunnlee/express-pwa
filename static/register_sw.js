if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', {scope: '/' })
		.then(reg => {
			console.info('>>> registered service worker ', reg)
		})
		.catch(err => {
			console.info('>>> cannot register service worker ', err)
			alert(`Cannot register service worker ${JSON.stringify(err)}`)
		})
}
