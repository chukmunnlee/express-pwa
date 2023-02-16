import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
	const wb = new Workbox('/sw.js');

	wb.addEventListener('waiting', event => {
		console.log('Waiting to activate sw.js')
	})

	wb.addEventListener('activated', event => {
		console.info('event: ', event);
	})

	wb.register();
}

