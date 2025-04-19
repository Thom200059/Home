export default {
	data() {
		return {}
	},
	//分享小程序
	onShareAppMessage(e) {
		let currentRoute  = this.$mp.page.route;
		console.log("currentRoute",e);
		if (e.from === 'button') {
			console.log('来自页面内转发按钮');
		} else if (e.from === 'menu') {
			console.log('右上角菜单转发按钮',currentRoute);
		}
		let id = uni.getStorageSync('pageId') 
		return {
			// 自定义分享内容
			title: ' ',
			desc: '分享',
			path: '/'+currentRoute+'?'+"id"+"="+id// 路径，可传递参数到指定页面
		};
	},
	// 分享到朋友圈
	onShareTimeline() {
		return {
			title: ' ',
			path: '/pages/home/home',
		};
	},
}
