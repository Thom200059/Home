<template>
	<view>
		<view class="">
			<u-parse :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import {
		disclaimer
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				content: `<p>露从今夜白，月是故乡明</p>
						<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
						`
			}
		},
		onLoad() {
			this.getdisclaimer()
		},
		methods: {
			getdisclaimer() {
				disclaimer().then(res => {
					this.content = res.data[0].disclaimer
					console.log(res, 456);
				})
			}

		}
	}
</script>

<style lang="less">

</style>