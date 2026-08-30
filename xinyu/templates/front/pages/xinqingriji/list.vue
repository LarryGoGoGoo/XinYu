<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
		<view class="riji-page">
			<!-- 顶部治愈头部 -->
			<view class="riji-header">
				<view class="riji-header-title">心情日记</view>
				<view class="riji-header-sub">记录此刻，安放情绪</view>
				<view class="riji-header-actions">
					<view class="riji-search">
						<input class="riji-search-input" v-model="searchForm.rijibiaoti" type="text" placeholder="搜索日记标题" placeholder-class="riji-search-ph" confirm-type="search" @confirm="search" />
					</view>
					<view class="riji-sort" @tap="sortClick('addtime')">
						<text class="riji-sort-text">{{ listOrder == 'desc' ? '最新' : '最早' }}</text>
						<text class="riji-sort-arrow">{{ listOrder == 'desc' ? '▾' : '▴' }}</text>
					</view>
				</view>
			</view>

			<!-- 日记列表 -->
			<view class="riji-list">
				<view class="riji-card" v-for="(item, index) in list" :key="index" @tap="onDetailTap(item)">
					<view class="riji-card-date">
						<text class="riji-date-day">{{ formatDay(item.addtime) }}</text>
						<text class="riji-date-month">{{ formatMonth(item.addtime) }}</text>
					</view>
					<view class="riji-card-body">
						<view class="riji-card-title">{{ item.rijibiaoti || '无标题' }}</view>
						<view class="riji-card-content">{{ item.rijineirong }}</view>
						<image v-if="item.rijitupian" class="riji-card-img" mode="aspectFill" :src="preHttp(item.rijitupian) ? item.rijitupian.split(',')[0] : (baseUrl + item.rijitupian.split(',')[0])"></image>
						<view class="riji-card-ops">
							<view class="riji-op riji-op-edit" @tap.stop="onUpdateTap(item)">修改</view>
							<view class="riji-op riji-op-del" @tap.stop="onDeleteTap(item.id)">删除</view>
						</view>
					</view>
				</view>

				<!-- 未登录引导 -->
				<view v-if="!isLogin" class="riji-empty">
					<view class="riji-empty-icon">☁</view>
					<view class="riji-empty-text">登录后查看你的心情日记</view>
					<view class="riji-login-btn" @tap="goLogin">去登录</view>
				</view>

				<!-- 空状态 -->
				<view v-else-if="!hasNext && list.length == 0" class="riji-empty">
					<view class="riji-empty-icon">☁</view>
					<view class="riji-empty-text">还没有日记，写下第一篇吧</view>
				</view>
			</view>

			<!-- 写日记悬浮按钮 -->
			<view class="riji-fab" @tap="onAddTap()">
				<text class="riji-fab-plus">＋</text>
				<text class="riji-fab-text">写日记</text>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				userid: '',
				isLogin: true,
				mescroll: null,
				downOption: {
					auto: false
				},
				upOption: {
					noMoreSize: 5,
					textNoMore: '~ 没有更多了 ~'
				},
				hasNext: true,
				searchForm: {
					rijibiaoti: '',
				},
				listSort: 'addtime',
				listOrder: 'desc',
			};
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onShow() {
			// 心情日记是隐私数据，仅登录用户可访问：直接取登录用户 id
			this.userid = uni.getStorageSync("appUserid");
			this.isLogin = !!uni.getStorageSync("appToken") && !!this.userid;
			this.hasNext = true
			if (this.isLogin) {
				if (this.mescroll) this.mescroll.resetUpScroll()
			}
		},
		methods: {
			preHttp(str) {
				return str && str.substr(0, 4) == 'http';
			},
			formatDay(time) {
				if (!time) return '';
				let d = String(time).split(' ')[0];
				return d ? d.substring(8, 10) : '';
			},
			formatMonth(time) {
				if (!time) return '';
				let d = String(time).split(' ')[0];
				return d ? (d.substring(5, 7) + '月') : '';
			},
			sortClick(type) {
				if (this.listSort == type) {
					this.listOrder = this.listOrder == 'desc' ? 'asc' : 'desc'
				} else {
					this.listSort = type
					this.listOrder = 'desc'
				}
				this.search()
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				this.hasNext = true
				mescroll.resetUpScroll()
			},
			async upCallback(mescroll) {
				if (!this.isLogin) {
					mescroll.endErr()
					return
				}
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
					sort: this.listSort,
					order: this.listOrder,
				}
				if (this.searchForm.rijibiaoti) {
					params['rijibiaoti'] = '%' + this.searchForm.rijibiaoti + '%'
				}
				let res = await this.$api.page(`xinqingriji`, params);
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				this.$forceUpdate()
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			onDetailTap(item) {
				this.$utils.jump(`./detail?id=${item.id}`)
			},
			onUpdateTap(row) {
				this.$utils.jump(`./add-or-update?id=${row.id}`)
			},
			onAddTap() {
				if (!this.isLogin) {
					this.goLogin()
					return
				}
				this.$utils.jump(`./add-or-update`)
			},
			goLogin() {
				uni.navigateTo({ url: '../login/login' })
			},
			onDeleteTap(id) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除这篇日记？',
					success: async function(res) {
						if (res.confirm) {
							await that.$api.del('xinqingriji', JSON.stringify([id]));
							that.$utils.msg('删除成功');
							that.hasNext = true
							that.search()
						}
					}
				});
			},
			async search() {
				this.mescroll.num = 1
				let params = {
					page: this.mescroll.num,
					limit: this.mescroll.size,
					sort: this.listSort,
					order: this.listOrder,
				}
				if (this.searchForm.rijibiaoti) {
					params['rijibiaoti'] = '%' + this.searchForm.rijibiaoti + '%'
				}
				let res = await this.$api.page(`xinqingriji`, params);
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				this.$forceUpdate()
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			},
		}
	};
</script>

<style lang="scss" scoped>
	$primary: #0e9488;
	$primary-deep: #0a756b;
	$primary-light: #4eb3a6;
	$ink: #263238;
	$grey: #90a4ae;
	$bg: #f5faf8;

	.riji-page {
		min-height: 100vh;
		background: $bg;
		padding-bottom: 200rpx;
		box-sizing: border-box;
	}

	.riji-header {
		padding: 48rpx 32rpx 40rpx;
		background: linear-gradient(160deg, #0a756b 0%, #0e9488 55%, #4eb3a6 100%);
		border-radius: 0 0 40rpx 40rpx;
		.riji-header-title {
			font-size: 44rpx;
			font-weight: 700;
			color: #ffffff;
			line-height: 1.3;
		}
		.riji-header-sub {
			margin-top: 8rpx;
			font-size: 26rpx;
			color: rgba(255, 255, 255, 0.85);
		}
		.riji-header-actions {
			margin-top: 36rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;
		}
		.riji-search {
			flex: 1;
			background: rgba(255, 255, 255, 0.96);
			border-radius: 40rpx;
			height: 76rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			.riji-search-input {
				flex: 1;
				height: 76rpx;
				font-size: 27rpx;
				color: $ink;
			}
		}
		.riji-sort {
			background: rgba(255, 255, 255, 0.96);
			border-radius: 40rpx;
			height: 76rpx;
			display: flex;
			align-items: center;
			padding: 0 28rpx;
			.riji-sort-text {
				font-size: 27rpx;
				color: $ink;
			}
			.riji-sort-arrow {
				margin-left: 8rpx;
				font-size: 26rpx;
				color: $primary;
			}
		}
	}

	.riji-list {
		padding: 32rpx 28rpx 0;
	}

	.riji-card {
		background: #ffffff;
		border-radius: 24rpx;
		margin-bottom: 28rpx;
		padding: 28rpx;
		display: flex;
		box-shadow: 0 8rpx 30rpx rgba(14, 148, 136, 0.07);
		.riji-card-date {
			width: 100rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 4rpx;
			.riji-date-day {
				font-size: 48rpx;
				font-weight: 700;
				color: $primary;
				line-height: 1;
			}
			.riji-date-month {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: $primary-light;
			}
		}
		.riji-card-body {
			flex: 1;
			margin-left: 24rpx;
			min-width: 0;
		}
		.riji-card-title {
			font-size: 32rpx;
			font-weight: 600;
			color: $ink;
			line-height: 1.4;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.riji-card-content {
			margin-top: 12rpx;
			font-size: 27rpx;
			color: #607d8b;
			line-height: 1.6;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.riji-card-img {
			margin-top: 20rpx;
			width: 100%;
			height: 280rpx;
			border-radius: 16rpx;
			background: #eef5f3;
		}
		.riji-card-ops {
			margin-top: 24rpx;
			display: flex;
			justify-content: flex-end;
			gap: 20rpx;
			.riji-op {
				padding: 10rpx 32rpx;
				border-radius: 30rpx;
				font-size: 26rpx;
				line-height: 1.4;
			}
			.riji-op-edit {
				color: $primary;
				background: rgba(14, 148, 136, 0.10);
			}
			.riji-op-del {
				color: #e57373;
				background: rgba(229, 115, 115, 0.10);
			}
		}
	}

	.riji-empty {
		padding: 160rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		.riji-empty-icon {
			font-size: 120rpx;
			color: #cfe6e1;
			line-height: 1;
		}
		.riji-empty-text {
			margin-top: 32rpx;
			font-size: 28rpx;
			color: $grey;
		}
		.riji-login-btn {
			margin-top: 40rpx;
			width: 280rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			background: linear-gradient(126deg, #4eb3a6 3%, #0e9488 97%);
			color: #ffffff;
			font-size: 30rpx;
			font-weight: 600;
			box-shadow: 0 12rpx 32rpx rgba(14, 148, 136, 0.35);
		}
	}

	.riji-fab {
		position: fixed;
		right: 32rpx;
		bottom: 60rpx;
		height: 96rpx;
		padding: 0 36rpx;
		border-radius: 48rpx;
		background: linear-gradient(126deg, #4eb3a6 3%, #0e9488 97%);
		box-shadow: 0 12rpx 32rpx rgba(14, 148, 136, 0.35);
		display: flex;
		align-items: center;
		z-index: 999;
		.riji-fab-plus {
			font-size: 44rpx;
			color: #ffffff;
			line-height: 1;
			margin-right: 8rpx;
		}
		.riji-fab-text {
			font-size: 30rpx;
			color: #ffffff;
			font-weight: 600;
		}
	}
</style>
