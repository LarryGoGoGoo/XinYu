<template>
	<view class="content">
		<view class="login-box" :style="{'backgroundImage': indexBgUrl?`url(${$base.url + indexBgUrl})`:''}">
			<view :style='{"width":"100%","padding":"0","position":"relative","borderRadius":"20rpx","background":"none","height":"auto"}'>
				<image :style='{"width":"160rpx","margin":"0 auto 24rpx auto","borderRadius":"8rpx","display":"block","height":"160rpx"}' :src="indexLogoUrl?($base.url + indexLogoUrl):'/static/logo.png'" mode="aspectFill"></image>
				<view v-if="loginType==1" :style='{"margin":"0 0 40rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"#00000050","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="uni-form-item uni-column">
					<view :style='{"padding":"0 20rpx 0 40rpx","color":"#FFFFFF","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">手机号：</view>
					<input v-model="username" :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#FFFFFF","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' type="text" class="uni-input" name="" placeholder="请输入手机号" />
				</view>
				<view v-if="loginType==1" :style='{"margin":"0 0 40rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"#00000050","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="uni-form-item uni-column">
					<view :style='{"padding":"0 20rpx 0 40rpx","color":"#FFFFFF","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">密码：</view>
					<input v-model="password" password :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#FFFFFF","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' type="password" class="uni-input" name="" placeholder="请输入密码" />
				</view>
				<view v-if="roleNum>1&&loginType<=2" :style='{"margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"#00000050","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}'>
					<view :style='{"padding":"0 20rpx 0 40rpx","color":"#FFFFFF","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">用户类型：</view>
					<picker @change="optionsChange" :value="index" :range="options" :style='{"padding":"0 20rpx","lineHeight":"80rpx","fontSize":"28rpx","color":"#BDBDBD","flex":"1"}'>
						<view class="uni-picker-type">{{options[index]}}</view>
					</picker>
				</view>
				

				
				<button v-if="loginType==1||loginType==3||loginType==4" class="btn-submit" @tap="onLoginTap" type="primary" :style='{"border":"0","padding":"0px","margin":"40rpx 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a680 3%,#0e948860 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}'>登录</button>
				<button v-if="loginType==2" class="btn-submit" @tap="onFaceLoginTap" type="primary" :style='{"border":"0","padding":"0px","margin":"40rpx 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a680 3%,#0e948860 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}'>人脸识别登录</button>
				<view class="links" :style='{"width":"100%","padding":"0","margin":"0 0 24rpx 0","flexWrap":"wrap","display":"flex","height":"auto"}'>
					<view class="link-highlight" @tap="onRegisterTap('yonghu')" :style='{"padding":"10rpx 20rpx","margin":"0 20rpx 20rpx 0","fontSize":"28rpx","color":"#ddd","borderRadius":"60rpx","background":"#00000030"}'>注册用户</view>
					<view class="link-highlight" @tap="onSkipLoginTap" :style='{"padding":"10rpx 20rpx","margin":"0 20rpx 20rpx 0","fontSize":"28rpx","color":"#ddd","borderRadius":"60rpx","background":"#00000030"}'>暂不登录</view>
				</view>
				
				<view class="idea1" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea1</view>
				<view class="idea2" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea2</view>
				<view class="idea3" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea3</view>
			</view>
		</view>
	</view>
</template>

<script>
	import menu from '@/utils/menu'
	export default {
		data() {
			return {
				username: '',
				password: '',
				loginType:1,
				codes: [{
					num: 1,
					color: '#000',
					rotate: '10deg',
					size: '16px'
				}, {
					num: 2,
					color: '#000',
					rotate: '10deg',
					size: '16px'
				}, {
					num: 3,
					color: '#000',
					rotate: '10deg',
					size: '16px'
				}, {
					num: 4,
					color: '#000',
					rotate: '10deg',
					size: '16px'
				}],
				options: [
					'请选择登录用户类型',
				],
				optionsValues: [
					'',
					'yonghu',
				],
				index: 0,
				roleNum:0,

				indexBgUrl: '',
				indexLogoUrl: '',
			}
		},
		onLoad() {
			let options = ['请选择登录用户类型'];
			let menus = menu.list();
			this.menuList = menus;
			for(let i=0;i<this.menuList.length;i++){
				if(this.menuList[i].hasFrontLogin=='是'){
					options.push(this.menuList[i].roleName);
					this.roleNum++;
				}
			}
			if(this.roleNum==1) {
				this.index = 1;
			}	
			this.options = options;
			this.styleChange()
			
		},
		onShow() {
		},
		mounted() {
		},
		methods: {
			async styleChange() {
				let rs = await this.$api.getPublic('config/info?name=appLoginBackgroundImg')
				this.indexBgUrl = rs.data?rs.data.value:''
				rs = await this.$api.getPublic('config/info?name=appLoginLogo')
				this.indexLogoUrl = rs.data?rs.data.value:''
			},
			onRegisterTap(tableName) {
				uni.setStorageSync("loginTable", tableName);
				this.$utils.jump('../register/register')
			},
			onSkipLoginTap() {
				// 暂不登录：清掉登录页，回到首页 tab
				uni.switchTab({
					url: '../index/index',
					fail: function() {
						uni.navigateBack({})
					}
				})
			},
			async onLoginTap() {
				if(this.loginType==1) {
					if (!this.username) {
						this.$utils.msg('请输入手机号')
						return
					}
					if (!this.password) {
						this.$utils.msg('请输入用户密码')
						return
					}
					if (!this.optionsValues[this.index]) {
						this.$utils.msg('请选择登录用户类型')
						return
					}
				}

				this.loginPost()

			},
			async loginPost() {
				let that = this
				let res = await this.$api.login(`${this.optionsValues[this.index]}`, {
					username: this.username,
					password: this.password
				});
				uni.removeStorageSync("useridTag");
				uni.setStorageSync("appToken", res.token);
				uni.setStorageSync("nickname",this.username);
				uni.setStorageSync("nowTable", `${this.optionsValues[this.index]}`);
				res = await this.$api.session(`${this.optionsValues[this.index]}`);
				if(res.data.touxiang) {
					uni.setStorageSync('frontHeadportrait', res.data.touxiang);
				} else if(res.data.headportrait) {
					uni.setStorageSync('frontHeadportrait', res.data.headportrait);
				}
				if(that.optionsValues[that.index]== 'yonghu') {
					uni.setStorageSync('appExamName', res.data.yonghuxingming);
				}
				uni.setStorageSync('userSession',JSON.stringify(res.data))
				// 保存用户id
				uni.setStorageSync("appUserid", res.data.id);
				if(res.data.vip) {
					uni.setStorageSync("vip", res.data.vip);
				}
				uni.setStorageSync("appRole", `${this.options[this.index]}`);
				this.$utils.tab('../index/index');
			},
			optionsChange(e) {
				this.index = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}
	
	.content {
		height: 100%;
		box-sizing: border-box;
	}
	.login-box {
		padding: 0 56rpx;
		background: linear-gradient(165deg, #0a756b 0%, #0e9488 45%, #4eb3a6 100%);
		display: flex;
		width: 100%;
		min-height: 100vh;
		align-items: center;
		height: auto;
		position: relative;
	}
	.login-box::before {
		content: "";
		position: absolute;
		inset: 0;
		background: rgba(20, 31, 48, .34);
	}
	.login-box > view {
		position: relative;
		z-index: 1;
		padding: 44rpx 34rpx !important;
		border-radius: 24rpx !important;
		background: rgba(255, 255, 255, .14) !important;
		backdrop-filter: blur(10px);
		box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, .16);
	}
	.uni-form-item {
		background: rgba(255, 255, 255, .92) !important;
		box-shadow: 0 8rpx 24rpx rgba(20, 31, 48, .1);
	}
	.label {
		color: #465568 !important;
	}
	.uni-input {
		color: #263238 !important;
	}
	.links .link-highlight {
		color: #fff !important;
		background: rgba(255, 255, 255, .18) !important;
	}
</style>
