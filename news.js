const fetch = require('node-fetch')

const NEWS_ENDPOINT = 'https://newsapi.org/v2/top-headlines'

module.exports = function(newsKey) {
	return function(q = '', country = '', pageSize = 20) {
		const url = new URL(NEWS_ENDPOINT)
		url.searchParams.append('apiKey', newsKey)
		url.searchParams.append('category', 'technology')
		url.searchParams.append('country', country || 'sg')
		if (!!q)
			url.searchParams.append('q', q)
		url.searchParams.append('pageSize', pageSize)
		console.info('>>>> url = ', url)
		return fetch(url, { method: 'GET', })
			.then(result => result.json())
	}
}
