<template>
	<view class="content">
		
		<!-- 周边配套 -->
		<view class="arround">
			<text style="margin-bottom: 20rpx;display: block;">配套周边</text>
			<view class="location">
				<text>位置：</text><text style="color: #3a7ebf ;">{{detaildata.address}}</text>
			</view>
			<view class="map">
				<map id="map" class="map"  :longitude="long" :latitude="lat" :markers="markers" show-location>
					<!-- <cover-image class="controls-play" src="/static/image/mapposition.png" /> -->
				</map>
			</view>
			<view class="roundlist">
				<view class="round-bar">
					<u-tabs :list="list5" lineWidth="20" lineColor="#4dd4a8" @click="changeType" :activeStyle="{
					            color: '#303133',
					            fontWeight: 'bold',
					            transform: 'scale(1.05)'
					        }">
					</u-tabs>
				</view>
				<!-- <u-read-more  color='#979797'> -->

				<view class="round-con" @click="changeLongLat(item)" v-for="item in maskPointList" :key="item.id">
					<view class="round-list">

						<text>{{item.title}}</text>
						<view class="adre-icon">
							<image src="https://house.xb-l.com//2023/08/29/1693277054php6KEkCT.png" mode=""></image>
							<text style="color: #fff;">{{item._distance}}m</text>
						</view>
					</view>
				</view>
				<u-empty v-if="maskPointList.length == 0" mode="data"
					icon="http://cdn.uviewui.com/uview/empty/data.png">
				</u-empty>
				<!-- </u-read-more> -->

			</view>
		</view>
		
	
	</view>
</template>

<script>
	import {
		details,
		likeGoods,
		removeCollect,
		getSecond,
		getGoodLike,
		commentAdd,
		comment,
		getSecondComment,
		getRandomGoods,
		likeCommit,
		addHistory
	} from '@/api/api.js'
	const QQMapWX = require("@/utils/qqmap-wx-jssdk.js")
	const qqmapsdk = new QQMapWX({
		key: 'N6LBZ-2FE3J-PMTFF-FA6DH-GIDFE-MBFEO'
	})
	export default {
		data() {
			return {
				showKeFu: false,
				firstlist: {},
				show: false, //添加评论弹窗
				commentContent: '', //弹窗评论内容
				meslist: [{
					id: 'a1',
					flage: false,
					img: 'https://cdn.uviewui.com/uview/album/1.jpg',
					names: '李志新--',
					tst: '二期无法打开了哪里可能是参考博客名称二期无法打开了哪里可能是参考博客名',
					times: '12天',
					litter: [{
						id: 'b1',
						flage: false,
						img: 'https://cdn.uviewui.com/uview/album/1.jpg',
						names: '二级',
						tst: '二期无法打开了哪里可能是参考博客名称二期无法打开了哪里可能是参考博客名',
						times: '12天',
					}]
				}],
				meslistitem: '',
				toggle: true,
				messdtalig: true,
				swiperlist: [
					"https://house.xb-l.com//2023/08/29/1693282027phpnoEaPx.jpg"
				],
				list4: [],
				listItem: {},
				list5: [{
					name: '地铁'
				}, {
					name: '公交'

				}, {
					name: '学校'

				}, {
					name: '医院'

				}, {
					name: '购物'

				}],
				long: '116',
				lat: '39',
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				homeid: '',
				detaildata: {},
				state: false,
				city_code: '',
				likelist: {}, //猜你喜欢
				showHouse: false,
				acHouseimg: '',
				maskPointList: [],
				markers: []
			};
		},
		onLoad(option) {
			this.homeid = option.id

			console.log(option.id, 'dnklj  id');
			// this.getlist4()
			this.getComment()
			this.getRandomGoodss()
			// 初始化地址放到获取到小区位置后，避免接口慢没有拿到地址就初始化地图
			this.initMap()
			this.changeType({
				name: '地铁'
			})
			addHistory({
				user_id: uni.getStorageSync('user').id,
				goods_id: this.homeid,
			}).then(res => {

			})


		},
		onShow() {
			let pid = this.homeid
			this.getlist4()

		},
		methods: {
			mapClickMy() {
				uni.openLocation({
					longitude: Number(this.long),
					latitude: Number(this.lat),
					name: this.firstlist.address
				})
			},
			vrClick() {
				uni.navigateTo({
					url: '/pagesde/webview'
				})
				uni.setStorageSync('url', this.firstlist.vr)
				console.log(this.firstlist.vr);
			},
			keFu() {
				this.openKeFu()
			},
			closeKeFu() {
				this.showKeFu = false
			},
			openKeFu() {
				this.showKeFu = true
			},
			detalhande(id) {
				console.log(id, 'id');
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + id
				});
			},
			dianZan(id) {
				likeCommit({
					user_id: uni.getStorageSync('userid'),
					comment_id: id,
					goods_id: this.firstlist.id
				}).then(res => {
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
					this.getComment()
				})
			},
			// 猜你喜欢6
			getRandomGoodss() {
				getRandomGoods().then(res => {
					this.likelist = res.data
				})
			},
			getSecondComments(id) {
				getSecondComment({
					user_id: uni.getStorageSync("userid"),
					goods_id: this.homeid,
					comment_id: id
				}).then(res => {
					this.meslistitem = res.data
					console.log('zipingl1', this.meslistitem);
				})
			},
			getComment() {
				comment({
					user_id: uni.getStorageSync("userid"),
					goods_id: this.homeid
				}).then(res => {
					this.meslist = res.data
					this.meslist.forEach(i => {
						i.flage = false
					})
					console.log("评论", this.meslist);
				})
			},
			mianze() {
				uni.navigateTo({
					url: '/pagesde/pages/exemption/exemption'
				})
			},
			jiuCuo() {
				uni.navigateTo({
					url: '/pagesde/pages/exemption/mianZe?id=' + this.homeid
				})
			},
			getlist4() {
				let pid = this.homeid
				// let pid = 1
				getSecond({
					pid,
					user_id: uni.getStorageSync('userid')
				}).then(res => {
					this.firstlist = res.data.top_data
					this.list4 = res.data.arr
					this.city_code = res.data.top_data.city
					console.log(res.data.top_data, 'resresrestop_data')
					console.log(this.city_code, 'this.city_code');
					this.detaildata = this.list4[0]
					this.state = res.data.top_data.state
					console.log(this.state, "getSecond@@@@@")
					this.long = res.data.top_data.address_x
					this.lat = res.data.top_data.address_y
					this.swiperlist = [res.data.top_data.img]
					// this.initMap()
					// let adre=this.detaildata.city_code+this.detaildata.address
					// console.log(this.detaildata, 'this.detaildata');
					// console.log(adre, 'this.detaildata');
					// this.formSubmit(adre)

				})

			},
			// 订阅
			subscribe() {
				// this.state = !this.state
				console.log(this.state, 'this.state');
				let goods_id = this.homeid
				let id = this.homeid
				if (this.state == 0) {
					likeGoods({
						goods_id,
						user_id: uni.getStorageSync('userid')
					}).then(res => {
						console.log(res, 'resres');
						this.getlist4()
						uni.showToast({
							icon: "success",
							title: res.info
						})
					})
				} else {
					removeCollect({
						id,
						user_id: uni.getStorageSync('userid')
					}).then(res => {
						this.getlist4()
						uni.showToast({
							icon: "none",
							title: res.info
						})
					})
				}

			},
			// 切换房子tabar
			clickbar(index) {
				console.log(index, 'indexindex');
				this.detaildata = index
				console.log(index, 'eeee');

			},
			changes() {},
			// 添加评论确定
			firmbtn() {
				let data = {
					goods_id: this.homeid,
					user_id: uni.getStorageSync('userid'),
					text: this.commentContent
				}
				commentAdd(data).then(res => {
					this.getComment()
				})
				// commentContent

				this.show = false
			},
			// 添加评论取消
			celbtn() {
				this.show = false
			},
			change(index) {

			},
			click() {},


			formSubmit(e) {

				console.log(e, 'eeeeeeee');
				var _this = this;
				let address = e
				console.log(address, 'addressaddress')
				//调用地址解析接口
				qqmapsdk.geocoder({
					//获取表单传入地址
					address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
					success: function(res) { //成功后的回调
						console.log(res, 'resersresse');
						var res = res.result;
						var latitude = res.location.lat;
						var longitude = res.location.lng;

					},
					fail: function(error) {
						console.error(error);
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
					key: 'B5XBZ-S5VWZ-VVXXA-ZJWPW-SI3QF-IBFVV '
				});

			},
			//猜你喜欢
			// likehandel(){
			// 	let para={
			// 		city_code:this.city_code
			// 	}
			// 	console.log(para,'para');
			// 	getGoodLike(para).then(res=>{
			// 		console.log(res,'res11111111111');
			// 	})
			// },

			// 回复消息评论
			hadelms(i) {
				this.getSecondComments(this.meslist[i].id)
				this.meslist[i].flage = !this.meslist[i].flage
				console.log('23232')
			},
			// 展示户型图
			showHouseimg(url) {
				// this.showHouse = true
				// this.acHouseimg = url
				uni.previewImage({
					urls: [url]
				})
			},
			closeHouse() {
				this.showHouse = false
			},
			openHouse() {},
			changeType(item) {
				let that = this
				that.markers = []
				console.log(item, "tabs")
				let myMap = new QQMapWX({
					key: 'B5XBZ-S5VWZ-VVXXA-ZJWPW-SI3QF-IBFVV'
				});
				myMap.search({
					keyword: item.name,
					success: function(res) {
						console.log(res, "successMap")
						that.maskPointList = res.data
						// that.maskPointList.forEach(item => {
						// 	item.latitude = item.location.
						// })
						for (var i = 0; i < res.data.length; i++) {
							that.markers.push({ // 获取返回结果，放到mks数组中
								title: res.data[i].title,
								id: Number(res.data[i].id),
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
								iconPath: "https://house.xb-l.com//2023/08/29/1693277054php6KEkCT.png", //图标路径
								width: 20,
								height: 20,
								callout: {
									content: res.data[i].title,
									color: '#0000ff',
									fontSize: 15,
									bgColor: "#ffffff",
									borderRadius: 50,
									padding: 4,
									display: 'ALWAYS',
									x: 0,
									y: 10
								},
							})
						}
						console.log(that.maskPointList, "maskPointList")
						console.log(that.markers, "maskPointList")
						// that.initMap()
					},
					fail: function(err) {
						console.log(err, "failMap")
					}
				})
			},
			changeLongLat(item) {
				console.log(item, "changeLongLat")
				let myMap = new QQMapWX({
					key: 'B5XBZ-S5VWZ-VVXXA-ZJWPW-SI3QF-IBFVV'
				});
				console.log(myMap, "myMap")
				this.long = item.location.lng
				this.lat = item.location.lat
				uni.openLocation({
					longitude: Number(item.location.lng),
					latitude: Number(item.location.lat),
					name: item.title
				})
			}
		}
	}
</script>

<style lang="scss">
	.errorBox {
		.errorList {
			margin: 20rpx;
			display: flex;
			justify-content: space-between;

			.errotItem {
				display: flex;
				color: #b1bac4;
				align-items: center;

			}
		}



	}


	.content {
		position: relative;
		padding-bottom: 15rpx;

		.vrstyltop {
			width: 80px;
			position: absolute;
			bottom: 50rpx;
			left: 50%;
			padding: 20rpx;

			margin-left: -40px;
			// margin: 30rpx 25rpx 0 25rpx;
			background-color: #fee7c0;
			color: #f5ad2f;
			text-align: center;
			z-index: 99;
			border-radius: 20rpx;
		}

		.swilist {
			// background-color: palegreen;
			height: 420rpx;
			// background-color: palegoldenrod;
			position: relative;

		}

		.homename {
			// background-color: chocolate;
			padding: 25rpx;

			.home-he {
				display: flex;
				justify-content: space-between;

				.pepomess {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 19rpx;
					color: #a2a2a2;

					image {
						margin-bottom: 5rpx;
						width: 37rpx;
						height: 37rpx;
					}
				}
			}

			.homeaddress {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.hom-total {
					display: flex;
					flex-direction: column;

					.homea-dd {
						width: 300rpx;
						margin-left: 30rpx;
						// background-color: rebeccapurple;
						font-size: 28rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 9rpx;
							height: 21rpx;
						}
					}

					.looknum {
						font-size: 22rpx;
						margin-top: 10rpx;
					}
				}

				.orders {
					background-color: #FAA002;
					padding: 5rpx 10rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					border-radius: 5rpx;
				}


			}

		}

		.taberlist {
			// display: flex;
			// background-color: #FAA002;
			padding: 30rpx 20rpx;
			margin: 20rpx;
			border-radius: 30rpx;
			border: 1px solid #eaeaea;
			/* 边框样式 */
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			/* 外阴影样式 */
			.pending {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 20rpx;

				.pending-list {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}

		// 小区概况
		.community {
			padding: 20rpx;
			margin: 20rpx;
			/* 边框样式 */

			/* 外阴影样式 */
			.community-conte {
				font-size: 27rpx;
				margin: 22rpx 0;
				display: flex;
				justify-content: space-between;

				.unity1 {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}

		// 基础信息
		.information {
			padding: 20rpx 20rpx 0 20rpx;
			margin: 20rpx;
			// border-radius: 30rpx;
			// border: 1px solid #eaeaea;
			/* 边框样式 */
			// box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			/* 外阴影样式 */
			.inforlist {
				font-size: 27rpx;

				.infor-aver {
					margin: 17rpx 0;
					display: flex;

					.avers {
						margin-right: 70rpx;
					}
				}

				.infor-area {
					display: flex;
				}
			}
		}

		// 户型图
		.housediagram {
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 30rpx;
			border: 1px solid #eaeaea;
			/* 边框样式 */
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			/* 外阴影样式 */
			.housed-list {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				margin-top: 30rpx;

				.list-tot {

					image {
						width: 100%;
						height: 240rpx;
					}

					.list-text {
						margin-top: 20rpx;
						font-size: 25rpx;
						display: flex;
						flex-direction: column;
					}
				}

			}

			.vrstyl {
				padding: 20rpx;
				margin: 30rpx 25rpx 0 25rpx;
				background-color: #fee7c0;
				color: #f5ad2f;
				text-align: center;
			}
		}

		// 周边配套
		.arround {
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 30rpx;
			border: 1px solid #eaeaea;
			/* 边框样式 */
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			.location {
				padding: 10rpx 0 25rpx 0;
				font-size: 27rpx;
			}

			.map {
				position: relative;
				width: 100%;
				height: 500rpx;
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

			.roundlist {
				margin: 40rpx 0;

				.round-bar {
					margin-bottom: 20rpx;
				}

				.round-con {
					background-color: #4dd4a8;
					padding: 10rpx;
					border-radius: 20px;
					margin-bottom: 10rpx;

					.round-list {
						display: flex;
						justify-content: space-between;
						color: #FFFFFF;
						padding-left: 20rpx;
						padding-right: 20rpx;

						.adre-icon {
							display: flex;
							justify-content: center;
							align-items: center;

							image {
								margin-right: 10rpx;
								width: 29rpx;
								height: 29rpx;
							}
						}
					}
				}
			}
		}

		// 楼盘评论
		.comment {
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 30rpx;
			border: 1px solid #eaeaea;
			/* 边框样式 */
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			.com-list {
				padding-top: 20rpx;

				.img-list {
					display: flex;

				}

				.com-ten {
					// background-color: #FAA002;
					margin-left: 85rpx;
				}

				.days {
					margin-left: 85rpx;
					margin-top: 25rpx;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: space-between;

					.icon-list {

						display: flex;
						align-items: center;
					}

					image {
						margin-left: 10rpx;
						width: 37rpx;
						height: 37rpx;
					}
				}

				.seconds {
					// background-color: palegreen;
					width: 550rpx;
					margin-left: 50rpx;

					.sec-list {

						// padding-top: 20rpx;
						.img-list {
							display: flex;
						}

						.sec-ten {
							// background-color: #FAA002;
							margin-left: 85rpx;
							font-size: 28rpx;
						}

						.days {
							margin-left: 85rpx;
							margin-top: 15rpx;
							margin-bottom: 20rpx;
							display: flex;
							justify-content: space-between;

							image {
								width: 37rpx;
								height: 37rpx;
							}
						}
					}
				}
			}

			.addcount {
				padding: 20rpx;
				margin: 30rpx 25rpx 0 25rpx;
				background-color: #fee7c0;
				color: #f5ad2f;
				display: flex;
				justify-content: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.gase {
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 30rpx;
			border: 1px solid #eaeaea;
			/* 边框样式 */
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

			.gamlist {
				width: 100%;
				// background-color: #FAA002;
				margin-top: 20rpx;
				// margin-left: 2rpx;
				padding-left: 6rpx;
				display: flex;
				align-items: space-around;
				flex-wrap: wrap;
				// justify-content: space-between;
				box-sizing: border-box;

				.ga-list {


					display: inline-block;
					// background-color: palegreen;
					width: 220rpx;
					// text-align: center;

					.ga-img {
						image {
							width: 211rpx;
							height: 160rpx;
						}

						.ear {
							margin-top: -45rpx;
							margin-left: 14rpx;
							display: flex;
							align-items: center;
							font-size: 22rpx;
							color: #8D8D8D;

							image {
								width: 30rpx;
								height: 30rpx;
							}
						}
					}

					.gase-ads {
						margin-top: 25rpx;
						display: flex;
						flex-direction: column;
					}
				}

			}
		}
	}
</style>