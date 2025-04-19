<template>
	<view class="contain">
		<view class="headimg" :style="{'background-image': 'url('+image+')','background-size': '100%'}">
			<!-- <view class="respre">
				修改信息
			</view> -->
			<u-popup :show="showHead" @close="closeHead" @open="open" mode="center" :round="10">
				<view class="popup-boxHead">
					<image class="myHead" :src="userinfo.img"></image>
					<button class="but" open-type="chooseAvatar" @chooseavatar="chooseavatar">
						微信头像
					</button>
					<input type="nickname" placeholder="输入昵称" v-module="userinfo.name" @change="inputHead" />
				</view>
			</u-popup>

			<view class="box-head">
				<view class="headlist">
					<image :src="userinfo.img||''" @click="showHead=true" mode=""></image>
					<!-- <view class="head-text">
						{{userinfo.name||''}}
					</view> -->
				</view>
				<text class="head-text" style="margin-left: 35rpx; color: #fafafa;">{{logmess}}</text>

			</view>
		</view>
		<view class="function">
			<text style="font-weight: 600;">常用功能</text>
			<view class="fun_text">
				<view class="iconimg" @click="collect">
					<image src="https://house.xb-l.com//2023/09/14/1694668205phpPTmqT7.png" mode=""></image>
					<text style="font-size: 24rpx;margin-top: 17rpx;">楼盘足迹</text>
				</view>
				<view class="iconimg" @click="collect1">
					<image src="https://house.xb-l.com//2023/09/11/1694418507php8Q7TNG.jpg" mode=""></image>
					<text style="font-size: 24rpx;margin-top: 17rpx;">反馈意见</text>
				</view>
				<view class="iconimg" @click="collect2">
					<image src="https://house.xb-l.com//2023/09/11/1694418489phpVhfJlZ.jpg" mode=""></image>
					<text style="font-size: 24rpx;margin-top: 17rpx;">免责申明</text>
				</view>
				<view class="iconimg">
					<image src="https://house.xb-l.com//2023/09/11/1694418524phpwepgdg.jpg" mode=""></image>
					<text style="font-size: 24rpx;margin-top: 17rpx;">在线客服</text>
					<button open-type="contact"
						style="font-size: 24rpx; position: absolute; opacity: 0;   background-color: #ffffff;  margin-top: 17rpx;">客服</button>
				</view>
				<view class="iconimg" @click="collect3">
					<image src="https://house.xb-l.com//2023/09/11/1694418489phpVhfJlZ.jpg" mode=""></image>
					<text style="font-size: 24rpx;margin-top: 17rpx;">合作城市</text>
				</view>
				<!-- <view class="text_area">
					<u--textarea v-model="textvalue" placeholder="请输入内容"></u--textarea>
				</view> -->
			</view>
		</view>
		<view class="recommend">
			<text style="font-size: 40rpx;">我的收藏</text>
			<view class="heat">
				<text :class="souCangType===0 ?'heatshowtyle':''" @click="heatbtn(0)">热度</text>
				<text :class="souCangType==1 ?'heatshowtyle':''" @click="heatbtn(1)">距离</text>
				<text :class="souCangType==2 ?'heatshowtyle':''" @click="heatbtn(2)">最新</text>
			</view>
		</view>
		<!-- 我的收藏 -->
		<view class="gase">
			<!-- <text style="margin: 20rpx 0;font-weight: 600;">我的收藏</text> -->


			<view class="gamlist">
				<view class="prototal">
					<view class="prodlist" v-for="item in datalist" @click="detalhande(item.id)" :key="item.id">
						<view class="ductlis">
							<view class="details">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="textdetail">
								<text style="font-size: 29rpx;font-weight: 600;">{{item.name}}</text>
								<view class="redu">
									<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode="">
									</image>
									<text
										style="font-size: 22rpx;font-weight: 400;margin-left: 7rpx;">总人气：{{item.browse}}</text>
								</view>
								<view class="redu">
									<image src="https://house.xb-l.com//2023/08/29/1693277179phpu0SCkf.png" mode="">
									</image>
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
		</view>
		<!-- 猜你喜欢 -->
		<view class="gase" style="background-color: #ffffff;">
			<text style="margin: 20rpx 0; font-weight: 600;">兴趣楼盘</text>
			<view class="gamlist">
				<view class="ga-list" v-for="(item,index) in likelist" @click="detalhande(item.id)" :key="index">
					<view class="ga-img">
						<image :src="item.img" mode=""></image>
						<view class="ear">
							<text>{{item.city}}</text>
						</view>
					</view>
					<view class="gase-ads">
						<text style="font-size: 28rpx;">{{item.name}}</text>
						<text style="font-size: 22rpx;color: #8D8D8D;">{{item.address}}</text>
					</view>
				</view>

			</view>
		</view>
		<view class="bodytext">

		</view>
	</view>
</template>

<script>
	import {
		loginJwt,
		uploadGoods,
		updateUserinfo,
		getUserinfo,
		getRandomGoods,
		getCollections,
		getPimage
	} from '@/api/api.js'
	export default {
		data() {
			return {
				souCangType: 0,
				image: '',
				datalist: [],
				code: '',
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				textvalue: '', //文本框内容
				detailSrc: 'https://cdn.uviewui.com/uview/album/1.jpg',
				urls: '',
				likelist: {}, //猜你喜欢
				showHead: false,
				userinfo: {},
				// user: {
				// 	nickname: '用户昵称',
				// 	avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				// },
				getuser: {
					names: '微信用户',
					userimg: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				},
				logmess: '未登录', //是否登录展示
				userid: '', //用户id
			};
		},
		onLoad() {


			if (!uni.getStorageSync('userid')) {
				this.login()
			}
			getPimage().then(res => {
				this.image = res.data.image
				console.log(res.data.image, "发的是我");
			})

		},
		onShow() {
			this.userinfo = uni.getStorageSync('user')
			console.log("ces", this.userinfo);
			if (!uni.getStorageSync('userid')) {
				this.login()
			} else {
				this.logmess = this.userinfo.name
				this.getUserinfos()
			}

			this.getRandomGoodss()
			// 我的收藏
			this.getFuzzyLocations()
			// console.log('ONuser', this.userinfo);
			// if(!uni.getStorageSync('userid')){
			// 	this.login()
			// }else{
			// 	this.logmess ='已登陆'
			// }
		},
		methods: {
			getFuzzyLocations() {
				uni.getFuzzyLocation().then(res => {
					let longlat = uni.getStorageSync('longlat')
					let para = {
						type: this.souCangType,
						user_id: uni.getStorageSync('userid'),
						to: `[${res.latitude},${res.longitude}]`
					}
					getCollections(para).then(res => {
						if (res.code) {
							this.datalist = res.data
						}
					})
				})
			},
			heatbtn(id) {
				console.log(12);
				this.datalist = []
				this.souCangType = id
				this.getFuzzyLocations()
			},

			// 猜你喜欢6
			getRandomGoodss() {
				getRandomGoods().then(res => {
					this.likelist = res.data
				})
			},
			detalhande(id) {
				console.log(id, 'id');
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + id
				});
			},
			getUserinfos() {
				getUserinfo({
					id: uni.getStorageSync('user').id
				}).then(res => {
					console.log("信息", res.user_data);
					this.userinfo = res.user_data
				})
			},
			closeHead() {
				this.showHead = false
			},
			open() {},
			//获取code
			login() {
				uni.login({
					provider: 'weixin',
					success: res => {
						this.code = res.code
						this.handel(this.code)
					}
				});

			},
			// // 获取openid
			// hqJMXX(code){ // 获取密钥 === 需要登录才可以获取密钥
			// 				uni.request({
			// 				    url: 'https://api.weixin.qq.com/sns/jscode2session',// 请求微信服务器
			// 				    method:'GET',
			// 				    data: {
			// 						appid: 'wx555e1f07c6412ee4',        //你的小程序的APPID
			// 						secret: 'a66bfe3994f430895030d7bedd48dc26',    //你的小程序秘钥secret,  
			// 						js_code: code,    //wx.login 登录成功后的code
			// 						grant_type:'authorization_code' //此处为固定值
			// 				    },
			// 				    success: (res) => {
			// 				        console.log('获取信息',res); 
			// 				    }
			// 				});
			// 			},

			// 获取微信头像			
			chooseavatar(e) {
				var that = this
				console.log(e, 179)
				const {
					avatarUrl
				} = e.detail
				that.userinfo.img = avatarUrl
				// this.userhead=avatarUrl
				// console.log(this.userhead,'this.userhead');
				// let imgBase64 = wx.getFileSystemManager().readFileSync(e.detail.avatarUrl, 'base64');
				// let background = 'data:image/png;base64,' + imgBase64;
				// console.log(background,'background');

				uni.uploadFile({
					url: 'https://house.xb-l.com/imageUpload', //仅为示例，非真实的接口地址
					filePath: e.detail.avatarUrl,
					name: 'img',
					header: {
						'content-type': 'multipart/form-data',
					},
					success: (uploadFileRes) => {
						that.userinfo.img = JSON.parse(uploadFileRes.data).data.file_path
						that.repsrhandel()
					}
				});


				// this.upheand(background)
			},
			// 获取昵称
			inputHead(i) {
				console.log(i, 'iiiii')
				this.userinfo.name = i.detail.value
				// this.username=i.detail.values
				// console.log(this.username,'this.username')
				// console.log(this.user.nickname ,'this.user.nickname ')
				this.repsrhandel()
			},
			// 登录
			handel(code) {
				let para = {
					code: this.code
				}
				loginJwt(para).then(res => {
					if (res.error_code == 0) {
						uni.setStorageSync('userid', res.userinfo.id)
						uni.setStorageSync('user', res.userinfo)
						this.userid = res.userinfo.id
						this.userinfo = res.userinfo
						this.logmess = res.msg
						// this.userinfo = uni.getStorageSync('user')
						console.log('userlogin', this.userinfo);
						uni.showToast({
							icon: 'success',
							title: '登陆成功！',

						})
						this.detailSrc = this.urls
					}
				})
			},
			// 信息修改
			repsrhandel() {
				// console.log("信息图片",this.userinfo.img);
				let para = {
					img: this.userinfo.img,
					name: this.userinfo.name,
					id: this.userinfo.id
				}
				updateUserinfo(para).then(res => {
					if (res.code == 200) {
						this.showHead = false
					}
					this.getUserinfos()
					console.log(res, 'res1212122')
				})
			},
			collect() {
				uni.navigateTo({
					url: '/pagesde/pages/collect/collect'
				});
			},
			collect1() {
				uni.navigateTo({
					url: '/pagesde/pages/exemption/mianZe?id=' + 1
				})
			},
			collect2() {
				uni.navigateTo({
					url: '/pagesde/pages/exemption/exemption'
				})
			},
			collect3() {
				uni.navigateTo({
					url: '/pagesde/pages/city/city'
				})
			},
		},
	}
</script>

<style lang="scss">
	.recommend {

		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 30rpx;
		margin: 20rpx 0 0 0;

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

	.gase {
		// background-color: #ffffff;
		padding: 10rpx;
		border-radius: 30rpx;
		border: 1px solid #eaeaea;
		/* 边框样式 */
		// box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

		.gamlist {
			width: 100%;
			// background-color: #FAA002;
			margin-bottom: 20rpx;
			// margin-left: 2rpx;
			padding-left: 6rpx;

			display: flex;
			align-items: space-around;
			flex-wrap: wrap;
			// justify-content: space-between;
			box-sizing: border-box;

			.prototal {
				// padding:0 10rpx 10rpx 10rpx ;
				// column-gap: 0;
				// column-count: 2;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				

				.prodlist {
					margin: 20rpx 0;
					background-color: #ffffff;
					// margin: 0 15rpx 15rpx 5rpx;
					// margin-bottom: 15rpx;
					padding-bottom: 20rpx;
					break-inside: avoid;
					border-radius: 20rpx;

					.ductlis {
						
						display: flex;
						flex-direction: column;
						align-items: center;

						// justify-content: center;
						.details {

							width: 350rpx;
display: flex;
						flex-direction: column;
						align-items: center;
							image {
								margin: 10rpx 0;
								border-top-left-radius: 7px;
								border-top-right-radius: 7px;
								width: 330rpx;
								height: 226rpx;
							}
						}

						.textdetail {
							width: 300rpx;
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

	.contain {
		min-height: 100vh;
		min-width: 100vw;
		background-color: #efefef;

		.headimg {
			overflow: hidden;
			height: 350rpx;
			// background-color: #19aafe;

			.popup-boxHead {
				width: 450rpx;
				height: 550rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				input {
					text-align: center;
					margin-top: 20rpx;
				}
			}

			.box-head {
				width: 450rpx;
				// display: flex;
				// justify-content: space-between;
				align-items: center;
				margin: 80rpx 35rpx;
				display: flex;

				image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.headlist {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.head-text {
					font-family: 'Times New Roman', Times, serif;
					font-weight: 600;
					font-size: 30rpx;
					margin-top: 20rpx;
					color: #f7f7f7;
				}
			}

			.myHead {

				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				position: relative;
			}



		}

		.function {
			border-radius: 20rpx;
			margin: auto;
			margin-top: -50rpx;
			background-color: #ffffff;
			width: 89%;
			padding: 20rpx;
			display: flex;
			flex-direction: column;

			.fun_text {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.iconimg {

					display: flex;
					flex-direction: column;
					width: 20%;
					align-items: center;
					margin: 20rpx 15rpx;

					image {
						width: 65rpx;
						height: 65rpx;
					}
				}
			}

			.text_area {
				width: 80%;
			}
		}

		// .bodytext {
		// 	margin-top: 20rpx;
		// 	background-color: #fefefe;
		// 	height: 505rpx;
		// }
	}
</style>