<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
		<view class="cu-bar bg-white search" :style='{"width":"100%","padding":"20rpx 24rpx","background":"none","display":"flex","height":"auto"}'>
			<view class="search-form round" :style='{"border":"none","margin":"0 12rpx 0 0","position":"relative","flex":"1"}'>
				<text class="icon iconfont icon-fangdajing07" :style='{"color":"rgb(153, 153, 153)","left":"0px","textAlign":"center","width":"80rpx","fontSize":"40rpx","lineHeight":"80rpx","position":"absolute","right":"0px"}'></text>
				<input :style='{"border":"0","padding":"12rpx 20rpx 12rpx 80rpx","color":"#0e9488","borderRadius":"40rpx","background":"#0e948830","width":"100%","lineHeight":"56rpx","fontSize":"28rpx","height":"80rpx"}' v-model="searchForm.questionname" type="text" placeholder="试题" ></input>
			</view>
			<button :style='{"border":"0","padding":"0px","margin":"0","color":"#fff","borderRadius":"60rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"136rpx","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' @tap="search" class="cu-btn shadow-blur round">搜索</button>
		</view>
		<view class="cu-list menu-avatar" v-for="(item,index) in list" v-bind:key="index" @click="showClick(index)">
			<view class="cu-item" style="height: 180rpx;">
				<view class="content" style="left: 20rpx;">
					<view class="text-grey">心理测评：{{item.papername}}</view>
					<view class="text-gray text-sm flex" style="display: -webkit-box;-webkit-line-clamp: 2;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;">
						试题：<rich-text :nodes="item.questionname"></rich-text>
					</view>
					<view class="text-gray text-sm flex">
						题型：{{item.type==0?'客观':'主观'}}题
					</view>
				</view>
				<view class="action">
					<view v-if="item.myscore==0" class="cu-tag round bg-grey sm">得分{{item.myscore}}</view>
					<view v-if="item.myscore>0" class="cu-tag round bg-red sm">得分{{item.myscore}}</view>
				</view>
			</view>
			<uni-transition :mode-class="['fade']" :duration="500" style="width: 100%;margin: 10px 0;background: #fff;padding: 16px;box-sizing: border-box;"
				:show="showIndex==index?true:false">
				<view class="text-gray text-sm flex">
					我的答案：{{item.myanswer}}
				</view>
			</uni-transition>
		</view>
		<view v-if="scrollTop>200" @tap="scrollTopClick" :style='{"boxShadow":"0 8rpx 16rpx rgba(0,0,0,.3)","borderRadius":"50%","textAlign":"center","bottom":"20%","background":"#ff000030","width":"60rpx","lineHeight":"60rpx","position":"fixed","right":"20rpx","height":"60rpx","zIndex":"999"}'>
			<span class="icon iconfont icon-jiantou07" :style='{"color":"#fff"}'></span>
		</view>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
					onScroll: true,
					toTop: false
				},
				hasNext: true,
				searchForm: {},
				CustomBar: '0',
				showIndex: -1,
				scrollTop: 0
			};
		},
		onShow() {
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		onLoad(options) {
			this.hasNext = true
			this.userid = options.userid
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		methods: {
			scrollChange(e){
				this.scrollTop = e.scrollTop
			},
			scrollTopClick(){
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			// 显示当前正确答案
			showClick(index){
				if(this.showIndex == index){
					this.showIndex = -1
				}else {
					this.showIndex = index
				}
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				// 重置分页参数页数为1
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let res = await this.$api.list(`examrecord`, {
					page: mescroll.num,
					limit: mescroll.size,
					userid: this.userid,
					sort: "id",
					myscore: 0,
					ismark: 1
				});
				// 如果是第一页数据置空
				if (mescroll.num == 1) this.list = [];
				for(let x in res.data.list){
					res.data.list[x].questionname = res.data.list[x].questionname.replace(/img src/gi,"img style=\"width:100%;\" src");
				}
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 搜索
			async search(){
				this.mescroll.num = 1
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				let params = {
					page: this.mescroll.num,
					limit: this.mescroll.size,
					userid: this.userid,
					sort: "id",
					myscore: 0,
					ismark: 1
				}
				if(this.searchForm.questionname){
					params.questionname = '%' + this.searchForm.questionname + '%'
				}
				let res = await this.$api.list(`examrecord`, params);
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				for(let x in res.data.list){
					res.data.list[x].questionname = res.data.list[x].questionname.replace(/img src/gi,"img style=\"width:100%;\" src");
				}
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			}
		}
	};
</script>

<style>

</style>
