<template>
	<view>
		<view class="searchClass">
			<u-search v-model="name"  @change="search123"></u-search>
		</view>
		<view class="box">
			<view class="item"  v-for="(item,index) in list" :key="index" @click="searchDetail(item.id)">
				<image :src="item.img" mode=""></image>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getHouse} from '@/api/api.js'
	export default {
		data() {
			return {
				name:'',
				list:{}
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			search123(){
				console.log(123);
				this.getData()
			},
			searchDetail(id){
				uni.setStorageSync('pageId',id)
				uni.navigateTo({
					url: '/pagesde/pages/detail/detail?id=' + id
				});
			},
			getData(){
				let data={
					type:0,
					keyName:this.name
				}
				getHouse(data).then(res=>{
					this.list = res.data
					console.log(res);
				})
			},
			
		}
	}
</script>

<style lang="scss">
.searchClass{
	padding: 20rpx;
}
.box{
	.item{
		
		padding: 20rpx;
		display: flex;
		align-items: center;
		image{
			margin-right: 30rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 20%;
		}
	}
}
</style>
