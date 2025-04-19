<template>
	<view>
		<view class="form-Box">
			<view class="item">
				请输入反馈内容：
			</view>
			<u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
		</view>
		<view class="form-Box">
			<view class="item">
				请输入联系方式：
			</view>
			<u--input placeholder="请输入内容" border="surround" v-model="value" ></u--input>
		</view>
		<view class="but" @click="getaddFeedback">
			提交
		</view>
	</view>
</template>

<script>
	import {addFeedback} from '../../../api/api.js'
	export default {
		data() {
			return {
				value: '',
				value1: '',
				pid:0
			}
		},
		onLoad(option) {
			this.pid = option.id
		},
		methods: {
			change(e) {
				console.log('change', e);
			},
			getaddFeedback(){
				let data = {
					pid:this.pid,
					describe:this.value1,
					phone:this.value
				}
				addFeedback(data).then(res=>{
					console.log(res,456);
					uni.showToast({
						icon:'none',
						title:res.info
					})
					uni.navigateBack({
						delta: 1
					})
				})
			}
		}
	}
</script>

<style lang="less">
.form-Box{
	.item{
		margin: 30rpx;
		font-weight: 700;
	}
}
.but{
	text-align: center;
	background-color: blue;
	border-radius: 30rpx;
	width: 80%;
	margin:30rpx auto;
	line-height: 80rpx;
	color: #fff;
}
</style>