<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
		<view class="report-list-page">
			<view class="search-bar">
				<view class="search-form">
					<text class="icon iconfont icon-fangdajing07"></text>
					<input v-model="searchForm.papername" type="text" placeholder="搜索测评名称"></input>
				</view>
				<button @tap="search" class="search-btn">搜索</button>
			</view>

			<view class="report-card" v-for="(item,index) in list" :key="index" @tap="onDetailTap(item)">
				<view class="card-main">
					<view class="report-title">{{ item.papername || '心理测评' }}</view>
					<view class="report-subtitle">{{ item.username || '当前用户' }}</view>
					<view class="meta-row">
						<view class="meta-item">
							<text class="meta-label">完成题目</text>
							<text class="meta-value">{{ formatProgress(item) }}</text>
						</view>
						<view class="meta-item">
							<text class="meta-label">测评时间</text>
							<text class="meta-value">{{ formatDate(item.createdAt) }}</text>
						</view>
					</view>
				</view>
				<view class="report-action">
					<text>{{ item.ismark > 0 ? '待完善' : '查看报告' }}</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>

			<view class="empty-tip" v-if="!list.length && !hasNext">暂无测评报告</view>
		</view>

		<view v-if="scrollTop>200" @tap="scrollTopClick" class="to-top">
			<span class="icon iconfont icon-jiantou07"></span>
		</view>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				mescroll: null,
				downOption: {
					auto: false
				},
				upOption: {
					noMoreSize: 5,
					textNoMore: '~ 没有更多了 ~',
					onScroll: true,
					toTop: false
				},
				hasNext: true,
				searchForm: {},
				scrollTop: 0,
				userid: '',
				hasUseridFilter: false
			}
		},
		onShow() {
			this.hasNext = true
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		onLoad(options) {
			this.hasNext = true
			this.userid = options.userid || ''
			this.hasUseridFilter = !!options.userid
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
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				this.hasNext = true
				mescroll.resetUpScroll()
			},
			buildParams(page, limit) {
				const params = {
					page,
					limit
				}
				if (this.hasUseridFilter && this.userid) params.userid = this.userid
				if(this.searchForm.papername){
					params.papername = '%' + this.searchForm.papername + '%'
				}
				return params
			},
			async upCallback(mescroll) {
				let res = await this.$api.groupby(this.buildParams(mescroll.num, mescroll.size));
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list || []);
				if (!res.data.list || res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			onDetailTap(item) {
				this.$utils.jump(`./report?paperid=${item.paperid}&examno=${item.examno || ''}&userid=${item.userid || ''}`)
			},
			async search(){
				this.mescroll.num = 1
				let res = await this.$api.groupby(this.buildParams(this.mescroll.num, this.mescroll.size));
				this.list = res.data.list || [];
				this.hasNext = this.list.length > 0;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			},
			formatDate(value) {
				if (!value) return '刚刚完成'
				return String(value).slice(0, 16).replace('T', ' ')
			},
			formatProgress(item) {
				const answered = item.answeredCount || item.recordCount || 0
				return item.questionCount ? `${answered}/${item.questionCount}` : String(answered)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.report-list-page {
		min-height: 100vh;
		background: #f7f8fb;
		padding: 24rpx 24rpx 60rpx;
	}
	.search-bar {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
	}
	.search-form {
		flex: 1;
		height: 80rpx;
		border-radius: 40rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		box-shadow: 0 10rpx 28rpx rgba(38, 47, 61, .06);
	}
	.search-form .icon {
		color: #8792a2;
		font-size: 34rpx;
		margin-right: 14rpx;
	}
	.search-form input {
		flex: 1;
		color: #242a31;
		font-size: 28rpx;
	}
	.search-btn {
		width: 132rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 14rpx;
		border-radius: 40rpx;
		background: #0a756b;
		color: #fff;
		font-size: 28rpx;
	}
	.report-card {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 22rpx;
		box-shadow: 0 16rpx 36rpx rgba(35, 45, 60, .08);
	}
	.card-main {
		min-width: 0;
	}
	.report-title {
		color: #242a31;
		font-size: 32rpx;
		font-weight: 700;
		line-height: 1.45;
	}
	.report-subtitle {
		color: #7d8591;
		font-size: 24rpx;
		margin-top: 8rpx;
	}
	.meta-row {
		display: flex;
		gap: 18rpx;
		margin-top: 22rpx;
	}
	.meta-item {
		flex: 1;
		background: #edf5f7;
		border-radius: 12rpx;
		padding: 16rpx;
	}
	.meta-label {
		display: block;
		color: #70808c;
		font-size: 22rpx;
	}
	.meta-value {
		display: block;
		color: #0a756b;
		font-size: 28rpx;
		font-weight: 700;
		margin-top: 8rpx;
	}
	.report-action {
		margin-top: 22rpx;
		color: #0a756b;
		font-size: 28rpx;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.empty-tip {
		text-align: center;
		color: #8792a2;
		font-size: 28rpx;
		padding: 80rpx 0;
	}
	.to-top {
		box-shadow: 0 8rpx 16rpx rgba(0,0,0,.18);
		border-radius: 50%;
		text-align: center;
		bottom: 20%;
		background: #0a756b;
		width: 60rpx;
		line-height: 60rpx;
		position: fixed;
		right: 20rpx;
		height: 60rpx;
		z-index: 999;
		color: #fff;
	}
</style>
