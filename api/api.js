import request from './request.js'
import {
	HTTP_REQUEST_URL,
	
} from '@/config/app';


// /getRegion 获取首页数据
export function getRegion(reqBody){
	return request.post('/getRegion',reqBody)
}
// /getRegion 获取首页数据
export function getRegionGoods(reqBody){
	return request.post('/getRegionGoods',reqBody)
}

// 登录接口
export function loginJwt(reqBody){
	return request.get('/loginWechat',reqBody)
}
//上传头像
export function imageUpload(reqBody){
	return request.post('/imageUpload',reqBody)
}
// 修改信息

export function updateUserinfo(reqBody){
	return request.post('/updateUserinfo',reqBody)
}

// getUserinfo 获取用户信息
export function getUserinfo(reqBody){
	return request.post('/index/LoginWechat/getUserinfo',reqBody)
}
// 加载图片
export function loading(reqBody){
	return request.post('/loading',reqBody)
}
// 首页距离展示
export function getGoodsWithLDistance(reqBody){
	return request.post('/index/goods/getGoodsWithLDistance',reqBody)
}
// 首页热度展示
export function getGoodsWithLikes(reqBody){
	return request.post('/index/goods/getGoodsWithLikes',reqBody)
}
// 收藏商品列表
export function getCollections(reqBody){
	return request.post('/getCollections',reqBody)
}
//商品详情
export function details(reqBody){
	return request.post('/detail',reqBody)
}
// 订阅
export function likeGoods(reqBody){
	// return request.post('/likeGoods',reqBody)
	return request.post('/addCollect',reqBody)
}

// 移除订阅
export function removeCollect(reqBody){
	return request.post('/removeCollect',reqBody)
}
//顶级分类
export function getTopClass(reqBody){
	return request.post('/Detail/topListDistance',reqBody)
}
//二级分类
export function getSecond(reqBody){
	return request.post('/index/Detail/getSecondClassiFication',reqBody)
}

// 猜你喜欢
export function getGoodLike(reqBody){
	return request.post('/index/goods/getGoodsWithLikes',reqBody)
}
// 地址

export function mapMsg(reqBody){
	return request.post('/index/Goods/mapMsg',reqBody)
}

// 详情/index/Detail/getSecondClassiFication
export function addFeedback(reqBody){
	return request.post('/index/Detail/addFeedback',reqBody)
}

// 详情/index/Detail/getSecondClassiFication
export function disclaimer(reqBody){
	return request.post('/index/Detail/disclaimer',reqBody)
}

// 添加评论
export function commentAdd(reqBody){
	return request.post('/commentAdd',reqBody)
}

// 加载评论/comment
export function comment(reqBody){
	return request.post('/index/comment/getTopComment',reqBody)
}
// 加载二级评论/comment
export function getSecondComment(reqBody){
	return request.post('/index/comment/getSecondComment',reqBody)
}

// /index/goods/getRandomGoods 6个商品
export function getRandomGoods(reqBody){
	return request.post('/index/goods/getRandomGoods',reqBody)
}

// likeCommit

// 点赞
export function likeCommit(reqBody){
	return request.post('/likeCommit',reqBody)
}

// 保存历史记录/index/History/addHistory
export function addHistory(reqBody){
	return request.post('/index/History/addHistory',reqBody)
}

// 获取历史记录/index/History/getHistory
export function getHistory(reqBody){
	return request.post('/index/History/getHistory',reqBody)
}
// /getPimage
export function getPimage(reqBody){
	return request.post('/getPimage',reqBody)
}
// https://house.xb-l.com/index/index/getHouse    楼盘模糊搜索
export function getHouse(reqBody){
	return request.post('/index/index/getHouse',reqBody)
}


// https://house.xb-l.com/index/index/getHouse    楼盘模糊搜索
export function indexcity(reqBody){
	return request.post('/index/index/city',reqBody)
}