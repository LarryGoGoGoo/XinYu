/**
 * 通用 uni-app 网络请求封装。
 * 统一处理 baseUrl、token、超时、鉴权失效和接口错误。
 */
import base from './base'

const SUCCESS_CODES = [0]
const DEFAULT_TIMEOUT = 15000

// 只清除登录态相关存储，避免误删其他缓存数据
const clearAuthStorage = () => {
	uni.removeStorageSync('appToken')
	uni.removeStorageSync('appUserid')
	uni.removeStorageSync('appSession')
	uni.removeStorageSync('appTableName')
	uni.removeStorageSync('appRole')
}

const showMessage = (title) => {
	if (!title) return
	uni.showToast({
		title,
		icon: 'none',
		duration: 2000
	})
}

export default {
	config: {
		baseUrl: base.url,
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: {},
		method: 'GET',
		dataType: 'json',
		timeout: DEFAULT_TIMEOUT,
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options = {}) {
		const requestOptions = Object.assign({}, this.config, options)
		requestOptions.baseUrl = requestOptions.baseUrl || this.config.baseUrl
		requestOptions.url = `${requestOptions.baseUrl}${requestOptions.url}`
		requestOptions.data = requestOptions.data || {}
		requestOptions.method = requestOptions.method || this.config.method
		requestOptions.dataType = requestOptions.dataType || this.config.dataType
		requestOptions.timeout = requestOptions.timeout || this.config.timeout

		const token = uni.getStorageSync('appToken')
		requestOptions.header = Object.assign({}, this.config.header, options.header || {})
		if (token) {
			requestOptions.header.Token = token
		}

		const config = Object.assign({}, requestOptions, {
			requestId: new Date().getTime()
		})

		if (this.interceptor.request) {
			this.interceptor.request(config)
		}

		return new Promise((resolve, reject) => {
			config.complete = (response) => {
				let nextResponse = response
				nextResponse.config = config
				if (this.interceptor.response) {
					nextResponse = this.interceptor.response(nextResponse) || nextResponse
				}

				const statusCode = nextResponse.statusCode
				const result = nextResponse.data || {}
				if (statusCode === 200) {
					if (
						SUCCESS_CODES.indexOf(result.code) > -1 ||
						(config.url.indexOf('updateColumn') !== -1 && result.code === 500) ||
						(config.url.indexOf('deleteColumn') !== -1 && result.code === 500)
					) {
						resolve(result)
						return
					}

			if (result.code === 401) {
				clearAuthStorage()
				showMessage('请登录后使用')
				uni.navigateTo({ url: '../login/login' })
				reject(result)
				return
			}

				showMessage(result.msg || '请求处理失败')
				reject(result)
				return
			}

			// 未登录/登录过期：后端可能返回 HTTP 401（中间件拦截）或 HTTP 200 + code 401
			if (statusCode === 401 || result.code === 401) {
				clearAuthStorage()
				showMessage('请登录后使用')
				uni.navigateTo({ url: '../login/login' })
				reject(nextResponse)
				return
			}

			if (statusCode === 404 && config.url.indexOf('session') > -1) {
				uni.clearStorageSync()
			}
			showMessage(statusCode ? `接口异常(${statusCode})` : '网络连接异常')
			reject(nextResponse)
			}
			uni.request(config)
		})
	},
	get(url, data, options = {}) {
		return this.request(Object.assign({}, options, { url, data, method: 'GET' }))
	},
	post(url, data, options = {}) {
		return this.request(Object.assign({}, options, { url, data, method: 'POST' }))
	},
	put(url, data, options = {}) {
		return this.request(Object.assign({}, options, { url, data, method: 'PUT' }))
	},
	delete(url, data, options = {}) {
		return this.request(Object.assign({}, options, { url, data, method: 'DELETE' }))
	}
}
