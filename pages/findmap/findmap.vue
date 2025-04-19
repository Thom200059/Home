<template>
	<view class="contain">

		<view class="searchcl">
			<u-search placeholder="请输入关键字..." v-model="keyword" @custom="searchbtn"></u-search>
		</view>
		<u-popup :show="show" mode="bottom" round="10" @close="close" @open="open">
			<view class="popupBox" @click="detailClick">
				<image :src="detailId.img" mode=""></image>
				<view class="miaosu">
					<u-icon name="eye" color="#ffffff" size="25"></u-icon>
					{{detailId.browse}}
				</view>
				<view class="">
					<view class="">
						<view class="item" style=" display: flex; justify-content: space-between;">
							<view class="" style="font-weight: 800; font-size: 40rpx; ">
								{{detailId.name}}
							</view>
							<view class="tabs">
								{{detailId.vr?'有VR':'无VR'}}
							</view>
						</view>
						<view class="item">
							{{detailId.describe}}
						</view>

						<view class="tabsBox item">

							<view class="">
								{{detailId.address}}
							</view>
							<view class="">
								{{detailId.distance}}
							</view>
						</view>

						<view class="bangdan item">
							<!-- 入选昨日人气榜第{{detailId.browse}}名 -->
							{{detailId.pm}}
						</view>

					</view>
				</view>

			</view>
		</u-popup>
		<view class="map">
			<map id="map" :markers="covers" class="map" scale="10" :longitude="longitude" :latitude="latitude"
				@markertap="markertap" show-location>
				<!-- <cover-image class="controls-play" src="/static/image/mapposition.png" /> -->
			</map>
		</view>
	</view>
</template>
<script>
	import {
		getRegionGoods,
		mapMsg
	} from '../../api/api.js'
	const QQMapWX = require("@/utils/qqmap-wx-jssdk.js")
	const qqmapsdk = new QQMapWX({
		key: 'N6LBZ-2FE3J-PMTFF-FA6DH-GIDFE-MBFEO'
	})

	export default {
		data() {
			return {
				detailId: 0,
				show: false,
				map: '',
				latitude: '', // 地图默认显示的维度
				longitude: '', // 地图默认显示的纬度
				keyword: '', //搜索地址
				long: '116',
				lat: '39',
				qqmapsdk: {},
				//地图相关
				_mapContext: '',
				keyword: '',
				covers: [
					// 	{
					// 	id:1,
					// 	latitude: 33.64738,
					// 	longitude: 114.65048,
					// 	iconPath: '../../static/image/7-2.1.png'
					// }, {
					// 	id:2,
					// 	latitude: 33.64739,
					// 	longitude: 114.65188,
					// 	iconPath: '../../static/image/7-2.1.png'
					// },
				],
				addressXY: [],
			};
		},


		onShow() {
			var that = this
			that.formSubmit()
			uni.getFuzzyLocation({
				type: 'gcj02',
				success: function(res) {
					that.addressXY = []
					that.addressXY.push(res.longitude)
					that.addressXY.push(res.latitude)
					console.log('当前位置的经度：' + res.longitude, that.addressXY);
					console.log('当前位置的纬度：' + res.latitude); //
					if (uni.getStorageSync('addressId')) {
						that.getRegionGoodss(uni.getStorageSync('addressId'))
					} else {
						that.getMapMsg()
					}
				}
			});
			console.log('uni.getStorageSync', uni.getStorageSync('addressId'));
			
			



		},
		onLoad(option) {

			

			// console.log(e,uni.getStorageSync('longlat'));
			this.initMap()


		},
		methods: {
			detalhande() {
				console.log("地址", this.detailId);
				uni.setStorageSync("lat", this.detailId.latitude)
				uni.setStorageSync("lon", this.detailId.longitude)
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + this.detailId.id
				});
			},
			getMapMsg() {
				mapMsg({
					name: this.keyword,
					to: '[' + this.addressXY.toString() + ']'
				}).then(res => {


					this.covers = res.data
					this.covers.forEach(i => {
						i.latitude = i.address_y
						i.longitude = i.address_x
						// 图片
						i.iconPath = i.img,

							i.width = 40,
							i.height = 40,
							i.title = i.name,
							i.callout = {
								iconPath: i.img,
								content: i.name,
								color: '#000000',
								fontSize: 15,
								bgColor: "#ffffff",
								borderRadius: 50,
								padding: 4,
								display: 'ALWAYS',
								x: 0,
								y: 10
							}

					})
					this.latitude = this.covers[0].latitude
					this.location = this.covers[0].location
					console.log(res, this.covers, "信息");

					// 拿到请求数据后，把数据传给点聚合功能；
					this.setMarkersAndCluster(this.covers) // 3、调用聚合功能 
				})
			},
			getRegionGoodss(id) {
				getRegionGoods({
					id: id,
					to: '[' + this.addressXY.toString() + ']',
				}).then(res => {
					// 注释打开 解决二级分类小区点进去，再返回地图
					// uni.removeStorageSync('addressId')
					this.covers = res.data
					this.covers.forEach(i => {
						i.latitude = i.address_y
						i.longitude = i.address_x
						i.iconPath = i.img,
							i.width = 40,
							i.height = 40,
							i.title = i.name,
							i.callout = {
								iconPath: i.img,
								content: i.name,
								color: '#000000',
								fontSize: 15,
								bgColor: "#ffffff",
								borderRadius: 50,
								padding: 4,
								display: 'ALWAYS',
								x: 0,
								y: 10
							}

					})
					this.latitude = this.covers[0].latitude
					this.location = this.covers[0].location
					console.log(res, this.covers, "信息");
					console.log(res.user_data, "goods");

				})
			},
			markertap(e) {
				console.log("123", e);
				this.open()
				// this.detailId = e.markerId
				this.covers.forEach(i => {
					if (i.id == e.markerId) {
						this.detailId = i
					}
				})

				// this.detalhande(e.markerId)
				console.log(e.markerId, e, "点击信息");
			},
			detailClick() {
				this.detalhande()
			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			// 地点搜索
			searchbtn(e) {
				console.log(e, '1212')
				this.getMapMsg()
				// var _this = this;

				// 调用接口
				// qqmapsdk.search({
				// 	keyword: 'e', //搜索关键词
				// 	location: '39.980014,116.313972', //设置周边搜索中心点
				// 	success: function(res) { //搜索成功后的回调
				// 		var mks = []
				// 		for (var i = 0; i < res.data.length; i++) {
				// 			mks.push({ // 获取返回结果，放到mks数组中
				// 				title: res.data[i].title,
				// 				id: res.data[i].id,
				// 				latitude: res.data[i].location.lat,
				// 				longitude: res.data[i].location.lng,
				// 				iconPath: "/resources/my_marker.png", //图标路径
				// 				width: 20,
				// 				height: 20
				// 			})
				// 		}
				// 		_this.setData({ //设置markers属性，将搜索结果显示在地图中
				// 			markers: mks
				// 		})
				// 	},
				// 	fail: function(res) {
				// 		console.log(res);
				// 	},
				// 	complete: function(res) {
				// 		console.log(res);
				// 	}
				// });
			},



			formSubmit(e) {
				var _this = this;
				let address = ''
				if (this.keyword != '') {
					address = this.keyword
				} else {
					address = uni.getStorageSync('address')
				}
				console.log('地址参数1', address);
				//调用地址解析接口

				qqmapsdk.geocoder({
					//获取表单传入地址
					address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
					success: function(res) { //成功后的回调
						console.log(res, 'resresresresresresers');
						var res1 = res.result;
						if (uni.getStorageSync('lat')) {
							_this.latitude = uni.getStorageSync('lat')
							_this.longitude = uni.getStorageSync('lon')

						} else {
							_this.latitude = res1.location.lat;
							_this.longitude = res1.location.lng;
						}


					},
					fail: function(error) {
						console.error(error);
						// uni.showToast({
						// 	title: '请输入具体地址信息！',
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			//地图初始化
			initMap() {
				this._mapContext = uni.createMapContext("map", this)
				this.qqmapsdk = new QQMapWX({
					key: 'B5XBZ-S5VWZ-VVXXA-ZJWPW-SI3QF-IBFVV'
				});
				console.log(this.qqmapsdk, 'this.qqmapsdk');
			},
			// 聚合功能
			setMarkersAndCluster(markerList) {
				// 1.组装数据之后，并赋值给地图上的marker
				this.covers = Array.from(markerList).map((item, i) => {
					return {
						...item,
						width: 41,
						height: 41,
						// iconPath: item.img,
						iconPath: "../../static/address.png",
						joinCluster: true, // 这个属性很重要，必须要

						callout: { // 自定义标记点上方的气泡窗口
							content: item.name,
							display: 'ALWAYS', // 'BYCLICK':点击显示; 'ALWAYS':常显
							padding: 5,
							textAlign: 'center',
							color: '#C2874D',
							borderRadius: 4
						},
						// label: { // 为标记点旁边增加标签
						// 	content: item.name,
						// 	borderColor: '#ff0000',
						// 	bgColor: '#ffffff'
						// },
					}
				});

				// 2.初始化点聚合的配置，未调用时采用默认配置
				this._mapContext.initMarkerCluster({
					enableDefaultStyle: false, // 是否启用默认的聚合样式(是否用自定义图标)
					zoomOnClick: true,
					gridSize: 60,
					complete(res) {
						console.log('initMarkerCluster', res)
					}
				});

				// 3.发生聚合时，给聚合点设置marker标签 一级别
				this._mapContext.on('markerClusterCreate', res => {
					const clusters = res.clusters // 新产生的聚合簇
					var zhou = clusters.map(item => {
						var {
							center, // 聚合点的经纬度数组
							clusterId, // 聚合簇id
							markerIds // 已经聚合了的标记点id数组
						} = item
						// var address = '保定去'



						console.log('item', item);
						return {


							...center,
							width: 50,
							height: 50,
							clusterId, // 必须有
							iconPath: '../../static/address.png',
							borderRadius: 8,
							joinCluster: true,
							// callout: { // 自定义标记点上方的气泡窗口
							// 	content: '',
							// 	display: 'ALWAYS', // 'BYCLICK':点击显示; 'ALWAYS':常显
							// 	padding: 5,
							// 	textAlign: 'center',
							// 	color: '#ffff00',
							// 	bgColor: '#C2874D',
							// 	borderRadius: 4
							// },
							label: { // 定制聚合点样式
								content: markerIds.length + '',
								fontSize: 14,
								width: 18,
								height: 18,
								color: '#ffffff',
								bgColor: '#C2874D',
								borderRadius: 6,
								textAlign: 'center',
								anchorX: 25,
								anchorY: -60,
							},



						}
					})
					console.log("dsadas", zhou);
					var that = this
					that._mapContext.addMarkers({
						markers: zhou,
						clear: false, //是否先清空地图上所有的marker
					})

					//获取区
					// qqmapsdk.reverseGeocoder({
					// 		location: zhou[0].latitude + "," + zhou[0].longitude,
					// 		success: function(res) { //成功后的回调
					// 			console.log(res, 'resresresresresresers');
					// 			zhou[0].callout.content = res.result.address_component.district
					// 			console.log('区域',  zhou[0].callout.content);
					// 			// 4. 添加聚合簇标签
					// 			that._mapContext.addMarkers({
					// 				markers: zhou,
					// 				clear: false, //是否先清空地图上所有的marker
					// 			})
					// 		},
					// 		fail: function(error) {
					// 			console.error(error);

					// 		},
					// 		complete: function(res) {
					// 			console.log(res);
					// 		}
					// 	}

					// )


				})
			},
		}
	}
</script>

<style lang="scss">
	.contain {
		.popupBox {
			margin: 20rpx;
			display: flex;

			image {
				margin-right: 30rpx;
				width: 200rpx;
				height: 200rpx;
			}

			.item {
				margin: 10rpx 0;
			}

			.miaosu {
				position: absolute;
				bottom: 70rpx;
				left: 30rpx;
				color: #fff;
				display: flex;
				align-items: center;
			}

			.bangdan {
				background-color: #f7ead9;
				color: #847363;
				line-height: 50rpx;
				padding: 0 10rpx;
				border-radius: 15rpx;
			}

			.tabs {
				line-height: 50rpx;
				padding: 0 10rpx;
				border-radius: 15rpx;
				background-color: #e5faf5;
				color: #50bea4;
			}

			.tabsBox {
				display: flex;
				justify-content: space-between;

			}

		}

		.searchcl {
			// background-color: palegreen;
			padding: 30rpx;
			border-bottom-left-radius: 20rpx;

			border-bottom-right-radius: 20rpx;
		}

		.map {
			position: relative;
			width: 100%;
			height: 100vh;
			padding: 2rpx;
			box-sizing: border-box;
			background-color: #fff;

			.controls-play {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
</style>