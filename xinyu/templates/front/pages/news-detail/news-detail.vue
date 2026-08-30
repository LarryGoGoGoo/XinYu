<template>
	<view :style='{"minHeight":"100%","width":"100%","padding":"24rpx","position":"relative","background":"#fff","height":"auto"}'>
		<view class="title" :style='{"lineHeight":"1.5","fontSize":"32rpx","color":"#333","textAlign":"center","fontWeight":"600"}'>{{detail.title}}</view>
		
		<view :style='{"padding":"0 0 12rpx 0","margin":"0 0 12rpx 0","borderColor":"#dddddd","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","justifyContent":"center"}'>
			<view :style='{"padding":"0"}'>
				<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
				<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>发布时间：{{detail.addtime}}</text>
			</view>
			<view :style='{"padding":"0"}'>
				<text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
				<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{detail.name}}</text>
			</view>
		</view>
		
		<view class="content" :style='{"width":"100%","color":"#666","background":"none","height":"auto"}'>
			<rich-text class="ql-snow ql-editor" :nodes="detail.content"></rich-text>
		</view>
		
		<div :style='{"width":"100%","padding":"0","margin":"20rpx 0 20rpx 0","justifyContent":"space-between","display":"flex","height":"auto"}'>
			<div @click="prepDetailClick" :style='{"padding":"0 20rpx","color":"#0e9488","background":"#0e948820","flex":"auto","width":"0","lineHeight":"80rpx","fontSize":"28rpx"}'>上一篇：prev</div>
			<div @click="nextDetailClick" :style='{"padding":"0 20rpx","color":"#0a756b","background":"#0a756b30","flex":"auto","width":"0","lineHeight":"80rpx","fontSize":"28rpx"}'>下一篇：next</div>
		</div>
		


	</view>
</template>
<script>
	export default {
		data() {
			return {
				detail: {},
				id: '',
				allList: [],
				currentIndex: 0,
			}
		},
		async onLoad(options) {
			this.id = options.id;
			this.getInfo()
		},
		computed:{
			baseUrl() {
				return this.$base.url;
			},
			userid(){
				return uni.getStorageSync('appUserid')
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage(){
			var obj = {
				title: this.detail.title,
				imageUrl: this.detail.picture?this.baseUrl + this.detail.picture.split(',')[0]: ''
			}
			return obj
		},
		// #endif
		methods: {
			async getInfo(){
				let res = await this.$api.info('news', this.id)
				res.data.content = res.data.content.replace(/<img/g,'<img style="width: 100%;"');
				this.detail = res.data;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				})
				res = await this.$api.list('news',{page:1,limit:100,sort:'addtime',order:'desc'})
				for(let x in res.data.list){
					if(res.data.list[x].id == this.id){
						this.currentIndex = Number(x)
						break
					}
				}
				this.allList = res.data.list
				
			},
			// 上一篇
			prepDetailClick(){
				if(this.currentIndex == 0){
					this.$utils.msg('已经是第一篇了')
					return false
				}
				this.currentIndex--
				this.id = this.allList[this.currentIndex].id
				this.getInfo()
			},
			// 下一篇
			nextDetailClick(){
				if(this.currentIndex == this.allList.length - 1){
					this.$utils.msg('已经是最后一篇了')
					return false
				}
				this.currentIndex++
				this.id = this.allList[this.currentIndex].id
				this.getInfo()
			},
			toDetail(id){
				this.id = id
				this.getInfo()
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
