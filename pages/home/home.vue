<template>
	<view class="contain">

		<!-- <u-sticky>
			<view class="hometitle">
				忆家全景
			</view>
		</u-sticky> -->
		<view class="" @click="searchMy">
			<u-search></u-search>
		</view>
		<view class="baner">
			<!-- <image src="../../static/image/编组 9@2x.png" mode=""></image> -->
			<view class="swipers " style="height: 300rpx;"> 
				<u-swiper  :list="swipimg" name="url" height="250"></u-swiper>
			</view>
			<u-scroll-list indicatorActiveColor="#4dd4a8">
				<view class="dericon"  >
					<!-- <view class="itemImage">
				  		<view class="">
				  			测试
				  		</view>
				  		<view class="mapdress">
				  			<image src="https://house.xb-l.com//2023/08/29/1693275732phpYhM2Dt.png" mode=""></image>
				  		</view>
				  	</view>
				  	<view class="itemImage itemImage1">
				  		<view class="">
				  			测试
				  		</view>
				  	</view> -->
					<view
					
						:class="{itemImage:item.img===0&&item.id!=1,itemImage1:item.img==1&&item.id!=1,itemImage2:item.img==2&&item.id!=1,anima:itemId==item.id,itemImage:item.id==1,}"
						v-for="(item,index) in listTop" @click="itemClick(item)" :key="index">
						<view class="">
							{{item.name}}
						</view>
						<view class="mapdress">
							<image :src="item.Background" mode=""></image>
						</view>
					</view>


				</view>
			</u-scroll-list>


		</view>
		<!-- 周边环境 -->
		<view class="" style="width: 100%;">
			<u-scroll-list indicatorActiveColor="#4dd4a8" indicatorBarWidth="10">
				<view class="adress" @click="handeto(item)" v-for="(item,index) in itemClickData" :key="index">
					<view class="mapsMy">
						<!-- @click="itemClickDetail()" -->
						<view class="imgsdre">
							<image :src="item.img" mode=""></image>
						</view>
						<text style="font-size: 23rpx;">{{item.name}}</text>
					</view>
				</view>
			</u-scroll-list>
			<!-- <view class="maps" @click="handeto(2)">
				<view class="imgsdre">
					<image src="https://house.xb-l.com//2023/08/29/1693275536phpgRyPRH.png" mode=""></image>
				</view>
				<text style="font-size: 23rpx;">{{landmark_l2}}</text>
			</view>
			<view class="maps" @click="handeto(3)">
				<view class="imgsdre">
					<image src="https://house.xb-l.com//2023/08/29/1693275639phpqh0Fzk.png" mode=""></image>
				</view>
				<text style="font-size: 23rpx;">{{street}}</text>
			</view>
			<view class="maps" @click="handeto(4)">
				<view class="imgsdre">
					<image src="https://house.xb-l.com//2023/08/29/1693275404phpqJCtTe.png" mode=""></image>
				</view>
				<text style="font-size: 23rpx;">{{town}}</text>
			</view> -->
		</view>
		<u-sticky>
			<view class="recommend">
				<text style="font-size: 40rpx;">{{quyuName}}</text>
				<view class="heat">
					<text :class="homeType===0 ?'heatshowtyle':''" @click="heatbtn(0)">热度</text>
					<text :class="homeType==1 ?'heatshowtyle':''" @click="heatbtn(1)">距离</text>
					<text :class="homeType==2 ?'heatshowtyle':''" @click="heatbtn(2)">最新</text>
				</view>
			</view>

		</u-sticky>
		<!-- 为你推荐 -->
		<view class="prototal">
			<view class="prodlist" v-for="item in datalist" :key="item.id" @click="detalhande(item.id)">
				<view class="ductlis">
					<view class="details">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="textdetail">
						<text style="font-size: 27rpx;font-weight: 600;margin-bottom: 10rpx;">{{item.name}}</text>
						<view class="redu">
							<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode=""></image>
							<text
								style="font-size: 22rpx;font-weight: 400;margin-left: 7rpx;">总人气：{{item.browse||0}}</text>
						</view>
						<view class="redu">
							<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode=""></image>
							<text
								style="font-size: 22rpx;font-weight: 400;margin-left: 7rpx;">昨日人气：{{item.yesterday||0}}</text>
						</view>
						<text style="font-size: 22rpx;color:#A5A7A5;margin-top: 20rpx;">{{item.address||''}}</text>
						<text style="font-size: 22rpx;margin-top: 15rpx;">{{item.distance||''}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		loading,
		uploadGoods,
		getGoodsWithLDistance,
		getGoodsWithLikes,
		getTopClass,
		getRegion
	} from '@/api/api.js'
	const QQMapWX = require("@/utils/qqmap-wx-jssdk.js")
	const qqmapsdk = new QQMapWX({
		key: 'N6LBZ-2FE3J-PMTFF-FA6DH-GIDFE-MBFEO'
	})
	export default {
		data() {
			return {
				itemId: 0,
				listTop: [],
				itemClickData: [],
				swipimg: [], //轮播图 
				distanceshow: false, //距离
				heatshow: true, //热度
				datalist: [], //列表
				lisy: '',
				mapad: [],
				longitude: '', //经度

				latitude: '', //维度
				addressname: '', //地址名称
				crossroad: '', //周边
				reference: {}, //周边经纬度
				landmark_l2: '', //周边二级
				landmark: {}, //周边二级经纬度
				street: '', //周边三级
				streetloc: {}, //周边三级经纬度
				town: '', //周边四级
				townloc: {}, //周边四级经纬度
				longlat: {},
				city_code: '', //城市编号
				homeType: 0, //tab分类
				page: 1,
				quyuName: "为您推荐",
			}
		},
		onReachBottom() {
			this.page = this.page + 1
			this.handelist()
		},

		onLoad() {
// 轮播图
			this.swipbtn();

			
			// 首页数据
			this.getRegions()

		},
		onShow() {
			// 经纬度
			this.handel2()
		},
		methods: {
			searchMy() {
				console.log(41);
				uni.navigateTo({
					url: '/pagesde/pages/search/search'
				})
			},
			itemClick(data) {
				this.itemId = data.id
				this.itemClickData = data.region
				this.quyuName = data.name
				console.log(data.name, "地址", data);
			},
			getRegions() {
				getRegion().then(res => {
					this.listTop = res.data
					this.itemClickData = this.listTop[0].region
					this.itemId = this.listTop[0].id
					console.log("首页数据", this.listTop[0]);
				})
			},

			handeto(e) {

				// if (e == 1) {
				// 	this.longlat = this.reference
				// } else if (e == 2) {
				// 	this.longlat = this.landmark
				// } else if (e == 3) {
				// 	this.longlat = this.streetloc
				// } else {
				// 	this.longlat = this.townloc
				// }
				uni.setStorageSync('addressId', e.id)
				console.log("调整", e);
				uni.switchTab({
					url: '/pages/findmap/findmap'
				});

				// console.log(e, this.longlat, 'this.longlat');
			},

			// 获取经纬度
			handel2() {
				let that = this
				uni.getFuzzyLocation({
					type: 'gcj02',
					success: function(res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						that.mapad.push(res.longitude)
						that.mapad.push(res.latitude)
						// that.mapad=res.longitude
						// that.mapad=res.latitude
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log(that.mapad, 'mapad');
						that.hanss()
						that.handelist()
					}
				});

			},
			// 转成地区名
			hanss() {
				var _this = this
				let location = {
					latitude: _this.latitude,
					longitude: _this.longitude,
				}
				qqmapsdk.reverseGeocoder({
					location,
					success: function(res) {
						console.log(res, 'resersrs');
						uni.setStorageSync('address', res.result.address)
						_this.city_code = res.result.ad_info.city
						_this.addressname = res.result.address_component.city
						_this.crossroad = res.result.address_reference.crossroad ? res.result.address_reference
							.crossroad.title : res.result.address_component.district
						// _this.reference=res.result.address_reference.crossroad.location
						_this.landmark_l2 = res.result.address_reference ? res.result.address_reference
							.landmark_l2.title : '村庄'
						_this.landmark = res.result.address_reference.landmark_l2.location
						_this.street = res.result.address_reference.street ? res.result.address_reference
							.street.title : '村庄'
						_this.streetloc = res.result.address_reference.street ? res.result.address_reference
							.street.location : '村庄'
						_this.town = res.result.address_reference.town ? res.result.address_reference.town
							.title : '村庄'
						_this.townloc = res.result.address_reference.town ? res.result.address_reference.town
							.location : '村庄'
						// _this.heatbtn()
						// _this.handelist()
					},
					fail: function(error) {
						console.log(error);
					},
				})


				// const qqmapsdk =new QQMapWX({key:'B5XBZ-S5VWZ-VVXXA-ZJWPW-SI3QF-IBFVV'}).reverseGeocoder({
				// 	location,
				// 	success: function(res) {
				// 		console.log(res,'reseersrser');
				// 	},
				// 	 fail: function(error) {
				// 	        console.log(error,'[[[[[[[[[]]]]]]]]]');
				// 	      },
				// })
			},





			detalhande(id) {
				console.log(id, 'id');
				uni.setStorageSync('pageId', id)
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + id
				});
			},
			handel() {
				// 上传图片
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {

						let first = res.tempFilePaths[0]


						uni.uploadFile({
							url: 'https://house.xb-l.com/imageUpload', //仅为示例，非真实的接口地址
							filePath: first,

							name: 'img',
							header: {
								'content-type': 'multipart/form-data',
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes, "?????????")
								// this.username=JSON.parse(uploadFileRes.data).data.file_path
								// console.log(JSON.parse(uploadFileRes.data).data.url, 123);
								let avatar = JSON.parse(uploadFileRes.data).data.file_path
								console.log(avatar, 'avatar');
							}
						});


					}
				});
			},

			// 轮播图
			swipbtn() {
				loading().then(res => {
					if (res.code) {
						this.swipimg = res.data
					}
					console.log(res, 'res')
				})
			},

			// 展示列表
			handelist() {
				let da = []
				da[0] = this.longitude
				da[1] = this.latitude
				let para = {
					city_code: this.addressname,
					page: this.page,
					type: this.homeType,
					to: '[' + da.toString() + ']',
				}
				getTopClass(para).then(res => {
					if (res.code) {
						res.data.forEach(i => {
							this.datalist.push(i)
						})

					}
					console.log(res, 'resres12121');
				})
			},
			heatbtn(id) {
				this.datalist = []
				this.homeType = id
				this.handelist()
			},

			// 热度
			// heatbtn(){
			// 	console.log(this.addressname,this.mapad,'12121121212');
			// 	this.datalist=[]
			// 	this.heatshow=true
			// 	this.distanceshow=false
			// 	if(this.heatshow){
			// 		let para={
			// 			city_code:this.addressname,
			// 			to:"["+this.mapad+"]"
			// 		}
			// 		getGoodsWithLikes(para).then(res=>{
			// 			if(res.code){
			// 				this.datalist=res.data
			// 			}
			// 		})
			// 	}

			// },

			// 距离
			// distance(){
			// 	this.distanceshow=!this.distanceshow
			// 	this.heatshow=false
			// 	if(this.distanceshow){
			// 		let para={
			// 			city_code:this.addressname,
			// 			to:"["+this.mapad+"]"
			// 		}
			// 		console.log(para,'parapara');
			// 		getGoodsWithLDistance(para).then(res=>{
			// 			if(res.code){
			// 				this.datalist=res.data
			// 			}
			// 			console.log(res,'rees');
			// 		})
			// 	}
			// },


		}
	}
</script>

<style lang="scss">
	.contain {

		min-height: 100vh;
		min-width: 100vw;
		background-color: #f0f0f0;

		.hometitle {
			position: absolute;
			top: 60rpx;
			left: 30rpx;
			z-index: 99;
			// color: #4dd4a8;
		}

		.baner {
			overflow: hidden;
			height: 600rpx;
			width: 100%;
			background-color: white;

			.swipers {
				background-color: palegoldenrod;
				height: 50rpx;
			}

			.dericon {
				position: relative;
				top: -30rpx;
				margin-top: 180rpx;
				display: flex;
				font-size: 40rpx;

				// justify-content: space-around;
				@keyframes myfirst {
					0% {
						transform: scale(0.8, 0.8);
					}

					50% {
						transform: scale(1.2, 1.2);
					}

					100% {
						transform: scale(0.8, 0.8);
					}
				}

				.anima {
					animation: 1s myfirst;

				}

				.itemImage {

					// transform:scale(1.2,1.2);
					display: flex;
					align-items: center;
					justify-content: center;
					width: 240rpx;
					height: 190rpx;
					background: url('https://house.xb-l.com//2023/08/29/1693275813phpwTS3tt.png') no-repeat;
					background-size:cover;
					margin: 0 30rpx;
					transform: scale(1.2);
				}

				.itemImage1 {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 240rpx;
					height: 190rpx;
					background: url('https://house.xb-l.com//2023/08/29/1693275828phpt3w0vS.png') no-repeat;
					background-size: 100% 100%;
					margin: 0 30rpx;
					transform: scale(1.2);
				}


				.itemImage2 {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 240rpx;
					height: 190rpx;
					background: url('https://house.xb-l.com//2023/08/29/1693275842phpHN8EU7.png') no-repeat;
					background-size: 100% 100%;
					margin: 0 30rpx;
					transform: scale(1.2);
				}




				.mapdress {
					position: absolute;
					width: 100rpx;
					height: 100rpx;
					margin-top: -150rpx;
					// margin-left: 0rpx;

					image {
						width: 60rpx;
						height: 90rpx;
					}
				}
			}
		}



		.adress {
			height: 140rpx;
			background-color: #ffffff;
			display: flex;
			width: 100%;
			justify-content: space-around;
			align-items: center;
			padding-bottom: 25rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}


		}

		.mapsMy {
			// background-color: paleturquoise;
			text-align: center;

			width: 140rpx;

			.imgsdre {
				margin-bottom: 7rpx;
			}

		}

		.recommend {
			display: flex;
			justify-content: space-between;
			background-color: #ffffff;
			padding: 30rpx;
			margin-top: -10rpx;


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

		.prototal {
			padding: 10rpx 10rpx 10rpx 10rpx;
			column-gap: 0;
			column-count: 2;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.prodlist {
				margin: 0 5rpx;
				margin-bottom: 15rpx;
				padding-bottom: 10rpx;
				width: 48%;
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