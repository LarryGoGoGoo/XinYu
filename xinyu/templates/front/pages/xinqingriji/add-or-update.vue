<template>
	<view class="riji-form-page">
		<view class="riji-form-card">
			<!-- 日记标题 -->
			<view class="riji-field">
				<view class="riji-field-label">日记标题</view>
				<input class="riji-field-input" v-model="ruleForm.rijibiaoti" placeholder="给今天的心情起个名字" placeholder-class="riji-ph" type="text" maxlength="30" />
			</view>

			<!-- 日记内容 -->
			<view class="riji-field">
				<view class="riji-field-label">日记内容</view>
				<textarea class="riji-field-textarea" v-model="ruleForm.rijineirong" placeholder="写下此刻的心情、想法或一天的小事…" placeholder-class="riji-ph" :maxlength="-1" />
			</view>

			<!-- 日记图片 -->
			<view class="riji-field">
				<view class="riji-field-label">日记图片</view>
				<view class="riji-upload" @tap="rijitupianTap">
					<image v-if="ruleForm.rijitupian" class="riji-upload-img" mode="aspectFill" :src="ruleForm.rijitupian.indexOf('http') == 0 ? ruleForm.rijitupian : baseUrl + ruleForm.rijitupian.split(',')[0]"></image>
					<view v-else class="riji-upload-empty">
						<text class="riji-upload-plus">＋</text>
						<text class="riji-upload-text">添加图片</text>
					</view>
				</view>
			</view>

			<!-- 发布时间 -->
			<view class="riji-field">
				<view class="riji-field-label">发布时间</view>
				<view class="riji-field-input riji-field-readonly" @tap="toggleTab('fabushijian')">{{ ruleForm.fabushijian || '点击选择时间' }}</view>
			</view>

			<button class="riji-submit" @tap="onSubmitTap(null)">保存日记</button>
		</view>

		<w-picker mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="fabushijianConfirm" ref="fabushijian" themeColor="#0e9488"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				ruleForm: {
					rijibiaoti: '',
					rijineirong: '',
					rijitupian: '',
					fabushijian: '',
					yonghuzhanghao: '',
					yonghuxingming: '',
				},
				user: {},
			}
		},
		components: {
			wPicker,
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onLoad(options) {
			this.ruleForm.fabushijian = this.$utils.getCurDateTime();
			let table = uni.getStorageSync("nowTable");
			// 获取登录用户信息，自动填充账号/姓名（不在界面展示）
			let res = await this.$api.session(table);
			this.user = res.data;
			this.ruleForm.yonghuzhanghao = this.user.yonghuzhanghao
			this.ruleForm.yonghuxingming = this.user.yonghuxingming
			this.ruleForm.userid = uni.getStorageSync("appUserid")

			// 更新操作
			if (options.id) {
				this.ruleForm.id = options.id;
				res = await this.$api.info(`xinqingriji`, this.ruleForm.id);
				this.ruleForm = res.data;
			}
			this.$forceUpdate()
		},
		methods: {
			fabushijianConfirm(val) {
				this.ruleForm.fabushijian = val.result;
				this.$forceUpdate();
			},
			rijitupianTap() {
				let _this = this;
				this.$api.upload(function(res) {
					_this.ruleForm.rijitupian = 'upload/' + res.file;
					_this.$forceUpdate();
				});
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			async onSubmitTap(subMitType = null) {
				let that = this
				if (!this.ruleForm.rijibiaoti) {
					this.$utils.msg('请填写日记标题');
					return
				}
				if (!this.ruleForm.rijineirong) {
					this.$utils.msg('请填写日记内容');
					return
				}
				if (this.ruleForm.id) {
					await this.$api.update(`xinqingriji`, this.ruleForm);
				} else {
					await this.$api.add(`xinqingriji`, this.ruleForm);
				}
				that.$utils.msgBack('保存成功');
			},
		}
	}
</script>

<style lang="scss" scoped>
	$primary: #0e9488;
	$primary-deep: #0a756b;
	$primary-light: #4eb3a6;
	$ink: #263238;
	$grey: #90a4ae;
	$bg: #f5faf8;

	.riji-form-page {
		min-height: 100vh;
		background: $bg;
		padding: 32rpx 28rpx 80rpx;
		box-sizing: border-box;
	}

	.riji-form-card {
		background: #ffffff;
		border-radius: 28rpx;
		padding: 36rpx 32rpx;
		box-shadow: 0 8rpx 30rpx rgba(14, 148, 136, 0.07);
	}

	.riji-field {
		margin-bottom: 36rpx;
	}

	.riji-field-label {
		font-size: 28rpx;
		font-weight: 600;
		color: $ink;
		margin-bottom: 18rpx;
	}

	.riji-field-input {
		background: #f2f8f6;
		border-radius: 16rpx;
		height: 88rpx;
		padding: 0 28rpx;
		font-size: 28rpx;
		color: $ink;
		display: flex;
		align-items: center;
	}

	.riji-field-readonly {
		color: #607d8b;
	}

	.riji-field-textarea {
		background: #f2f8f6;
		border-radius: 16rpx;
		width: 100%;
		height: 320rpx;
		padding: 28rpx;
		font-size: 28rpx;
		color: $ink;
		line-height: 1.6;
		box-sizing: border-box;
	}

	.riji-ph {
		color: #b0bec5;
	}

	.riji-upload {
		width: 100%;
		.riji-upload-img {
			width: 100%;
			height: 320rpx;
			border-radius: 16rpx;
			background: #eef5f3;
		}
		.riji-upload-empty {
			width: 100%;
			height: 200rpx;
			border: 2rpx dashed #cfe6e1;
			border-radius: 16rpx;
			background: #f7fcfa;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.riji-upload-plus {
				font-size: 60rpx;
				color: $primary-light;
				line-height: 1;
			}
			.riji-upload-text {
				margin-top: 12rpx;
				font-size: 26rpx;
				color: $grey;
			}
		}
	}

	.riji-submit {
		margin-top: 48rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 46rpx;
		background: linear-gradient(126deg, #4eb3a6 3%, #0e9488 97%);
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
		box-shadow: 0 10rpx 28rpx rgba(14, 148, 136, 0.30);
		&::after {
			border: none;
		}
	}
</style>
