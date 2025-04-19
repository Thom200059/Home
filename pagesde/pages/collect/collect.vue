<template>
	<!-- 我的收藏 -->
	<view class="contain">
		<view class="recommend">
			<text style="font-size: 40rpx;">楼盘足迹</text>
			<view class="heat">
				<text :class="homeType===0 ?'heatshowtyle':''" @click="heatbtn(0)">热度</text>
				<text :class="homeType==1 ?'heatshowtyle':''" @click="heatbtn(1)">距离</text>
				<text :class="homeType==2 ?'heatshowtyle':''" @click="heatbtn(2)">最新</text>
			</view>
		</view>
		<view class="prototal">
			<view class="prodlist" v-for="item in datalist" @click="detalhande(item.id)" :key="item.id">
				<view class="ductlis">
					<view class="details">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="textdetail">
						<text style="font-size: 29rpx;font-weight: 600;">{{item.name}}</text>
						<view class="redu">
							<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode=""></image>
							<text
								style="font-size: 22rpx;font-weight: 400;margin-left: 7rpx;">总人气：{{item.browse}}</text>
						</view>
						<view class="redu">
							<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode=""></image>
							<text
								style="font-size: 22rpx;font-weight: 400;margin-left: 7rpx;">昨日人气：{{item.yesterday}}</text>
						</view>
						<text style="font-size: 22rpx;color:#A5A7A5;margin-top: 8rpx;">{{item.address}}</text>
						<text style="font-size: 22rpx;margin-top: 15rpx;">{{item.distance}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getHistory
	} from '@/api/api.js'
	export default {
		data() {
			return {
				datalist: [],
				homeType: 0,
				longitude: '',
				latitude: ''
			}
		},
		onLoad() {
			this.handel2()
			this.getFuzzyLocations()
		},
		methods: {
			// 获取经纬度
			handel2() {
				let that = this
				uni.getFuzzyLocation({
					type: 'gcj02',
					success: function(res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						// that.mapad=res.longitude
						// that.mapad=res.latitude
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log(that.mapad, 'mapad');
					}
				});

			},
			heatbtn(id) {
				this.datalist = []
				this.homeType = id
				this.getFuzzyLocations()
			},
			getFuzzyLocations() {
				
				uni.getFuzzyLocation().then(res => {
					let da = []
					da[0] = this.longitude
					da[1] = this.latitude
					let longlat = uni.getStorageSync('longlat')
					let para = {
						user_id: uni.getStorageSync('userid'),
						type: this.homeType,
						to: '[' + da.toString() + ']',
						// goods_id:
					}
					getHistory(para).then(res => {
						if (res.code) {
							this.datalist = res.data
						}
					})
				})
			},
			detalhande(id) {
				console.log(id, 'id');
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + id
				});
			},
		}
	}
</script>

<style lang="scss">
	.recommend {

		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 30rpx;
		margin: 50rpx 0 0 0;
		// margin-top: 15rpx;
		.heatshowtyle {
			color: #4dd4a8;
		}

		.tancestyle {
			// display: block;
			color: #4dd4a8;
		}

		.heat {
			width: 225rpx;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			margin-right: 20rpx;
		}
	}

	.contain {
		min-height: 100vh;
		min-width: 100vw;
		background-color: #ededed;

		.prototal {
			padding: 0 10rpx 10rpx 10rpx;
			column-gap: 0;
			column-count: 2;

			.prodlist {
				margin: 0 15rpx 15rpx 5rpx;
				// margin-bottom: 15rpx;
				padding-bottom: 20rpx;
				width: 96%;
				break-inside: avoid;
				background-color: #ffffff;
				border-radius: 20rpx;

				.ductlis {

					padding: 10rpx;
					width: 93%;

					.details {

						width: 330rpx;

						image {
							text-align: center;
							border-top-left-radius: 7px;
							border-top-right-radius: 7px;
							width: 331rpx;
							height: 226rpx;
						}
					}

					.textdetail {
						width: 315rpx;
						display: flex;
						flex-direction: column;
						padding: 0 10rpx;

						.redu {
							image {
								width: 22rpx;
								height: 22rpx;
							}
						}
					}

				}
			}
		}
	}
</style>