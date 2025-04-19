import {
	HTTP_REQUEST_URL,
	HEADER
} from '@/config/app';

function baseRequest(url, method, data, {}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;
		// uni.showLoading({
		// 	title: '加载中'
		// });
	return new Promise((reslove, reject) => {
		if (!data) {
			data = {}
		}
		uni.request({
			url: Url  + url,
			method: method || 'GET',
			header: {
				'code':uni.getStorageSync('code')
			},
			data: data || {},
			success: (res) => {
				reslove(res.data, res);
			},
			fail: (message) => {
				reject('请求失败');
			},
			complete(message) {
				// uni.hideLoading()
			}
		})
	});
}

const request = {};

[ 'get', 'post', 'put', , 'delete',].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});

export default request;