<template>
	<view class="content">
		<u-popup :show="showKeFu" @close="closeKeFu" @open="openKeFu" mode="center">
			<view
				style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20rpx;border-radius: 10px;">
				<view class="">
					<span>扫描二维码,客服{{firstlist.ca}}将为您服务</span>
				</view>
				<image style="width: 400rpx; height: 400rpx; border-radius: 20rpx;" :src="firstlist.caimage"
					show-menu-by-longpress="true" mode="">
				</image>
			</view>
		</u-popup>
		<!-- 展示户型图 -->
		<u-popup :show="showHouse" @close="closeHouse" @open="openHouse" mode="center">
			<view>
				<image :src="acHouseimg" mode="aspectFit">
				</image>
			</view>
		</u-popup>
		<!-- 轮播图 -->
		<view class="" style="position: relative;">
			<view class="swilist">

				<u-swiper :list="swiperlist" @change="changes" height="210" @click="click"></u-swiper>
			</view>
			<view class="vrstyltop" @click="vrClick">
				点击进入VR全景
			</view>
		</view>


		<!-- 房子地址 -->

		<view class="homename">
			<view class="home-he">
				<text>{{firstlist.name}}</text>
				<view class="pepomess" @click="keFu">
					
				</view>

			</view>
			<view class="homeaddress">
				<view class="hom-total">
					<view class="homea-dd" @click="mapClickMy">
						<text style="font-size: 500;">{{firstlist.address}}</text>
						<view class="" style="display: flex; width: 200rpx; text-align: center; color: #50bea4;">
							导航
							<u-icon name="arrow-right" color="#50bea4" size="15"></u-icon>
						</view>
					</view>
					<view class="looknum">
						<text>浏览人数 {{firstlist.browse}}，收藏人数</text>
						<text>{{firstlist.subscribe}}+</text>
					</view>
				</view>
				<view class="">

					<view v-if="state == 1" style="display: flex; flex-direction: column; align-items: center;" @click="subscribe">
						<u-icon name="heart" color="#f05061" size="28"></u-icon>
						取消收藏
					</view>
					<view v-else @click="subscribe" style="display: flex; flex-direction: column; align-items: center;">
						<u-icon name="heart-fill" color="#f05061" size="28"></u-icon>
						收藏
					</view>
					

				</view>

			</view>
		</view>
		<!-- 房子分类 -->
		<view class="taberlist">
			<u-tabs :list="list4" @click="clickbar" lineWidth="75" lineColor="#4dd4a8" :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
			</u-tabs>
			<view class="pending">
				<view class="pending-list">
					<text style="color:#8D8D8D ;font-size: 30rpx;">约{{detaildata.refer_price||''}}万/平</text>
					<text style="color:#8D8D8D ;margin-top: 10rpx; font-size: 24rpx;">参考单价</text>
				</view>
				<view class="pending-list">
					<view class="">
						<text style="color:#8D8D8D ;font-size: 30rpx;">约</text>
						<text style="font-size: 30rpx;">{{detaildata.refer_total||''}}</text>
						<text style="color:#8D8D8D ;font-size: 30rpx;">万/套</text>
					</view>
					<text style="color:#8D8D8D ;margin-top: 10rpx; font-size: 24rpx;">参考总价</text>
				</view>
				<view class="pending-list">
					<text style="font-size: 30rpx; color:#4dd4a8;" v-if="detaildata.vr">有VR</text>
					<text style="font-size: 30rpx color:red;" v-else>无VR</text>
					<text style="color:#8D8D8D ;margin-top: 10rpx; font-size: 24rpx;">全景状态</text>
				</view>
			</view>
		</view>
		<!-- <view class="taberlist"> -->

			
			<!-- 基础信息 -->
			<!-- <view class="information">
				
				<text style="margin-bottom: 20rpx;display: block;">基础信息</text>
				<view class="inforlist">
					<view class="infor-aver">
						<view class="avers">
							<text >所在城区：</text>
							<text>{{detaildata.city_code||''}}</text>
						</view>
						
					</view>
					<view class="infor-aver">
						
						<view class="">
							<text>所属商圈：</text>
							<text>{{detaildata.shangquan||''}}</text>
						</view>
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text >开发商：</text>
							<text>{{detaildata.kaifa||''}}</text>
						</view>
						
					
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text>建筑类型：</text>
							<text>{{detaildata.jianzhu||''}}</text>
						</view>
						<view class="">
							<text >楼盘类型：</text>
							<text>{{detaildata.type||''}}</text>
						</view>
						
					
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text>产权年限：</text>
							<text>{{detaildata.life||''}}</text>
						</view>
						<view class="">
							<text >竣工日期：</text>
							<text>{{detaildata.jungong||''}}</text>
						</view>
						
					
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text>楼栋总数：</text>
							<text>{{detaildata.facade||''}}</text>
						</view>
						<view class="">
							<text >房屋户数：</text>
							<text>{{detaildata.fangwu||''}}</text>
						</view>
						
					
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text>物业公司：</text>
							<text>{{detaildata.average||''}}</text>
						</view>
						<view class="">
							<text >物业费用：</text>
							<text>{{detaildata.wuye||''}}</text>
						</view>
					</view>
					<view class="infor-aver">
						<view class="avers">
							<text>梯户比例：</text>
							<text>{{detaildata.area||''}}</text>
						</view>
						<view class="">
							<text >人车分流：</text>
							<text>{{detaildata.shunt||''}}</text>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 小区概况 -->
			<!-- <view class="community">
				<view class="community-conte">
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276838phpAioB5Z.png" mode=""></image>
						<text style="margin-left: 8rpx; color:#8D8D8D;">车位比：</text>
						<text>{{detaildata.parking||''}}</text>
					</view>
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276913phppndIMX.png" mode=""></image>
						<text style="margin-left: 8rpx; color:#8D8D8D;">停车位：</text>
						<text>{{detaildata.tingche||''}}</text>
					</view>
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276971phpiqsXXO.png" mode=""></image>
						<text style="margin-left: 8rpx; color:#8D8D8D;">泳池：</text>
						<text>{{detaildata.swim||''}}</text>
					</view>
					
				</view>
				<view class="community-conte">
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276934phpKDEj1J.png" mode=""></image>
						<text style=" color:#8D8D8D;">绿化率：</text>
						<text>{{detaildata.green||''}}</text>
					</view>
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276954phpW6elqf.png" mode=""></image>
						<text style=" color:#8D8D8D;">容积率：</text>
						<text>{{detaildata.volume||''}}</text>
					</view>
					
					<view class="unity1">
						<image src="https://house.xb-l.com//2023/08/29/1693276984phpNHxTVc.png" mode=""></image>
						<text style=" color:#8D8D8D;">阳台：</text>
						<text>{{detaildata.balcony||''}}</text>
					</view>
			
				</view>
				
			</view> -->
			
		<!-- </view> -->


		<!-- 户型图 -->
		<!-- <view class="housediagram">
			<text>小区平面图</text>
			<view class="housed-list">
				<view class="list-tot" v-for="(item,index) in detaildata.model_url" :key='index'>
					<image :src="item.url" @click="showHouseimg(item.url)" mode="aspectFit"></image>
				
				</view>
			</view>
			
		</view> -->
		<!-- 周边配套 -->
		<!-- <view class="arround">
			<text style="margin-bottom: 20rpx;display: block;">配套周边</text>
			<view class="location">
				<view class="">
					<text>位置：</text><text style="color: #3a7ebf ;">{{detaildata.address}}</text>
				</view>
				<view class="" @click="mapClick">
					更多
				</view>
			</view>
			<view class="map">
				<map id="map" class="map"  :longitude="long" :latitude="lat"
					:markers="markers" show-location>
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

			</view>
		</view> -->
		<!-- 楼盘评论 -->
		<view class="comment">
			<text>楼盘评论</text><text>({{meslist.length}})</text>
			<view class="com-list" v-for="(item,index) in meslist" :key="item.id">
				<view class="img-list">
					<u--image :showLoading="true" :src="item.user_data.img" shape='circle' width="35px" height="35px"
						@click="click"></u--image>
					<text style="color: #b5b5b5; margin-left: 18rpx;">{{item.user_data.name}}</text>
				</view>
				<view class="com-ten">
					{{item.text||''}}
				</view>
				<view class="days">
					<text style="font-size: 24rpx; color: #8D8D8D;">{{item.time}}</text>
					<view class="icon-list">
						<!-- {{item.is_like}} -->
						<!-- <image v-if="!item.is_like" style="margin-right: 25rpx;" @click="dianZan(index)"
							src="https://house.xb-l.com//2023/08/29/1693281842phpIOkUSD.png" mode=""></image> -->
						<u-icon name="thumb-up-fill" @click="dianZan(item.id)" v-if="!item.is_like" color="#707070"
							size="28"></u-icon>
						<u-icon name="thumb-up-fill" @click="dianZan(item.id)" v-else color="#faa002"
							size="28"></u-icon>
						<!-- <image src="https://house.xb-l.com//2023/08/29/1693282072phpb1P3XK.png" mode=""
							@click="hadelms(index)"></image>
							<text>展开</text> -->
					</view>
				</view>
				<!-- 二级 -->
				<view class="seconds" v-if="item.flage">
					<view class="sec-list" v-for="(itemm,indexx) in meslistitem" :key="itemm.id">
						<view class="img-list">
							<u--image :showLoading="true" :src="itemm.user_data.img" shape='circle' width="25px"
								height="25px" @click="click"></u--image>
							<text style="color: #b5b5b5; margin-left: 18rpx;">{{itemm.name}}</text>
						</view>
						<view class="sec-ten">
							{{itemm.text||''}}
						</view>
						<view class="days">
							<text style="font-size: 24rpx; color: #8D8D8D;">{{itemm.time}}</text>

						</view>
					</view>
				</view>
				<u-line></u-line>
			</view>
			<view class="">
				<u-modal :show="show" :title="title" showCancelButton='true' @confirm='firmbtn' @cancel="celbtn">
					<view class="slot-content">
						<form @submit="commitComments">
							<textarea class="contentTextArea" name="commentContent" v-model="commentContent"
								placeholder="请输入......"></textarea>
						</form>
					</view>
				</u-modal>
			</view>
			<view class="addcount">
				<view class="" @click="show = true">
					<text>添加评论</text>
				</view>

				<!-- <image src="https://house.xb-l.com//2023/08/29/1693277225phprp4jfs.png" mode=""></image> -->
			</view>
		</view>
		<!-- 猜你喜欢 -->
		
		<view class="gase">
			<view class="recommend">
				<!-- <text style="font-size: 40rpx;">{{detaildata.city_code}}</text> -->
				<text style="font-size: 40rpx;">猜你喜欢</text>
				<!-- <view class="heat">
					<text :class="homeType===0 ?'heatshowtyle':''" @click="heatbtn(0)">热度</text>
					<text :class="homeType==1 ?'heatshowtyle':''" @click="heatbtn(1)">距离</text>
					<text :class="homeType==2 ?'heatshowtyle':''" @click="heatbtn(2)">最新</text>
				</view> -->
			</view>
			<view class="gamlist">
				<view class="ga-list" v-for="(item,index) in likelist" @click="detalhande(item.id)" :key="index">
					<view class="ga-img">
						<image :src="item.img" mode=""></image>
						<!-- <view class="ear">

							<text>{{item.city}}</text>
						</view> -->
					</view>
					<view class="gase-ads">
						<text style="font-size: 28rpx;">{{item.name}}</text>
						<text style="font-size: 22rpx;color: #8D8D8D;">{{item.address}}</text>
					</view>
				</view>

			</view>
		</view>
		<!-- 纠错 -->
		<view class="errorBox">
			<view class="errorList">
				<view class="errotItem" @click="jiuCuo">
					<u-icon name="edit-pen-fill" color="#b1bac4" size="28"></u-icon>
					楼盘信息有问题？点击纠错
				</view>
				<u-icon name="arrow-right" color="#b1bac4" size="28"></u-icon>
			</view>
			<view class="" style="text-align: center; " @click="mianze">
				《免责申明》
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
			mapClick() {
				uni.navigateTo({
					url: '/pagesde/pages/mostMap?id=' + this.homeid
				})
			},
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
					uni.setNavigationBarTitle({
						title:this.firstlist.name
					})
					
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
			// width: 80px;
			position: absolute;
			bottom: 50rpx;
			left: 50%;
			transform: translateX(-25%);
			padding: 20rpx;
			margin-left: -40px;
			// margin: 30rpx 25rpx 0 25rpx;
			background-color: #4dd4a8;
			color: #000000;
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
						// display: flex;
						// justify-content: space-between;
						// align-items: center;

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
						width: 50%;
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
				display: flex;
				justify-content: space-between;
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
				background-color: #4dd4a8;
				// color: #f5ad2f;
				display: flex;
				justify-content: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	.recommend {

		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 20rpx;
		margin: 40rpx 0 0 0;

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
					width: 320rpx;
					// margin: 10rpx 0;
					text-align: center;

					.ga-img {
						image {
							width: 300rpx;
							height: 200rpx;
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
						text{
							line-height: 40rpx;
						}
						display: flex;
						flex-direction: column;
					}
				}

			}
		}
	}
</style>