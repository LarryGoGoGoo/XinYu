const normalizeUrl = (url) => {
	if (!url) return "http://localhost:8080/xinyu/"
	return url.endsWith('/') ? url : `${url}/`
}

const envBaseUrl = typeof process !== 'undefined' && process.env ? process.env.VUE_APP_BASE_API : ''

const base = {
	url: normalizeUrl(envBaseUrl || "http://localhost:8080/xinyu/"),
}

export default base
