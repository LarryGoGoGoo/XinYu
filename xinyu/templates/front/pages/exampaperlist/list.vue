<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
        <view class="exam-tip-bar">
            <text class="exam-tip-text">测评结果仅供参考，不构成医学诊断；如情绪持续困扰请及时寻求专业帮助</text>
        </view>
        <view class="search-bar">
            <view class="search-form round">
                <text class="search-icon iconfont icon-fangdajing07"></text>
                <input v-model="searchForm.name" type="text" placeholder="心理测评名称" placeholder-style="color:#999"></input>
            </view>
            <view class="search-btn" @tap="search">搜索</view>
        </view>
		<view class="uni-padding-wrap">
			<view class="list">
				<view @tap="onDetailTap(item)" v-for="(item,index) in list " v-bind:key="index" class="paper-card">
					<view class="paper-card-head">
						<view class="paper-emoji">测</view>
						<view class="paper-info">
							<view class="paper-name">{{item.name}}</view>
							<view class="paper-meta">测评时长：{{item.time}}分钟</view>
						</view>
					</view>
					<view class="paper-action">
						<text class="paper-btn">开始测评</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="scrollTop>200" @tap="scrollTopClick" :style='{"boxShadow":"0 8rpx 16rpx rgba(0,0,0,.3)","borderRadius":"50%","textAlign":"center","bottom":"20%","background":"#0e9488","width":"60rpx","lineHeight":"60rpx","position":"fixed","right":"20rpx","height":"60rpx","zIndex":"999"}'>
			<span class="icon iconfont icon-jiantou07" :style='{"color":"#fff"}'></span>
		</view>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
                btnColor: ['#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#e6a23c','#909399','#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#909399'],
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
				userid: '',
				scrollTop: 0
			};
		},
        onShow() {
            this.btnColor = this.btnColor.sort(()=> {
                    return (0.5-Math.random());
            });
			this.userid = uni.getStorageSync("appUserid");
        },
		onLoad(options) {
			
			this.hasNext = true
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
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
					status:1
				}
				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
				let res = await this.$api.list(`exampaper`, params)
				// 如果是第一页数据置空
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 详情
			async onDetailTap(row) {
				if(row.examnum>0) {
					let num = 0
					let res = await this.$api.groupby({
						paperid: row.id,
						userid: Number(uni.getStorageSync("appUserid"))
					})
					num = res.data.list.length
					if(num>=row.examnum) {
						this.$utils.msg('超过当前测评最大次数！')
						return false
					}
				}
				this.$utils.jump(`./exam?id=${row.id}`)
			},
			// 搜索
			async search() {
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size
				}
				if(this.searchForm.name){
					searchForm['name'] = '%' + this.searchForm.name + '%'
				}
				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
				let res = await this.$api.list(`exampaper`, searchForm);
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			}
		}
	};
</script>

<style>
	view {
		font-family: '\5FAE\8F6F\96C5\9ED1';
		font-size: 30upx;
	}

	.exam-tip-bar {
		padding: 16rpx 24rpx;
		background: #f0f6f5;
	}
	.exam-tip-text {
		color: #5f6f6b;
		font-size: 22rpx;
		line-height: 1.6;
	}

	page {
		background: #f6f8fb;
	}

	.search-bar {
		display: flex;
		align-items: center;
		padding: 20rpx 24rpx;
		background: #fff;
	}
	.search-form {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		height: 76rpx;
		background: #e5f4f1;
		border-radius: 40rpx;
		padding: 0 28rpx;
	}
	.search-icon {
		color: #999;
		font-size: 32rpx;
		margin-right: 12rpx;
	}
	.search-form input {
		flex: 1;
		font-size: 28rpx;
		color: #263238;
		height: 76rpx;
		line-height: 76rpx;
	}
	.search-btn {
		margin-left: 16rpx;
		padding: 0 36rpx;
		height: 76rpx;
		line-height: 76rpx;
		border-radius: 40rpx;
		background: linear-gradient(126deg, #4eb3a6 3%, #0e9488 97%);
		color: #fff;
		font-size: 28rpx;
	}

	.uni-padding-wrap {
		padding: 8rpx 24rpx 40rpx;
	}
	.list {
		padding: 16rpx 0;
	}
	.paper-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 8rpx 28rpx rgba(60, 92, 92, .08);
		border: 2rpx solid #eef3f2;
	}
	.paper-card-head {
		display: flex;
		align-items: center;
	}
	.paper-emoji {
		width: 88rpx;
		height: 88rpx;
		border-radius: 20rpx;
		background: #0e9488;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 40rpx;
		font-weight: 700;
		flex-shrink: 0;
	}
	.paper-info {
		padding-left: 22rpx;
		flex: 1;
		min-width: 0;
	}
	.paper-name {
		color: #263238;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 44rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.paper-meta {
		margin-top: 8rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 34rpx;
	}
	.paper-action {
		margin-top: 24rpx;
		display: flex;
		justify-content: flex-end;
	}
	.paper-btn {
		padding: 0 48rpx;
		height: 68rpx;
		line-height: 68rpx;
		border-radius: 999rpx;
		background: #0e9488;
		color: #fff;
		font-size: 26rpx;
	}
</style>
