<template>
	<view class="content">
		<view :style='{"minHeight":"100%","width":"100%","padding":"0","position":"relative","background":"#fff","height":"auto"}'>
			<view v-if="user&&user.id" :style='{"padding":"24rpx 24rpx 60rpx","margin":"0 0 20rpx 0","borderRadius":"0 0 0 100rpx","background":"linear-gradient(160deg, #0a756b 0%, #0e9488 55%, #4eb3a6 100%)","display":"flex","width":"100%","position":"relative","height":"auto"}' @tap="onPageTap('../user-info/user-info')" class="header" v-bind:class="{'status':isH5Plus}">
				<view :style='{"alignContent":"center","alignItems":"center","flexWrap":"wrap","flex":"1","flexDirection":"column","display":"flex","height":"100%"}' v-if="tableName=='yonghu'" class="userinfo">
					<image :style='{"width":"120rpx","padding":"0","margin":"0 20rpx 0 0","borderRadius":"100%","height":"120rpx"}' :src="user.touxiang?baseUrl+user.touxiang:require('../../static/gen/upload.png')"></image>
					<view :style='{"width":"auto","flex":"1","flexDirection":"column","justifyContent":"center","display":"flex"}' class="info">
						<view :style='{"width":"auto","lineHeight":"56rpx","fontSize":"36rpx","fontWeight":"600","color":"#fff","textAlign":"center"}'>{{user.yonghuxingming}}</view>
					</view>
					<view :style='{"margin":"20rpx 0 0","flexDirection":"row","display":"flex","gap":"20rpx","width":"100%","flexFlow":"wrap","justifyContent":"center"}' class="info">
						<view :style='{"padding":"8rpx 24rpx","borderRadius":"20rpx","textAlign":"center","background":"rgba(255,255,255,0.18)","flexDirection":"row","display":"flex","lineHeight":"36rpx","fontSize":"24rpx"}' v-if="user.jf||user.jf==0">
							<span :style='{"color":"#fff"}'>积分：</span>
							<span :style='{"color":"#fff"}'>{{user.jf}}</span>
						</view>
					</view>
				</view>
				<view :style='{"alignContent":"center","alignItems":"center","flexWrap":"wrap","flex":"1","flexDirection":"column","display":"flex","height":"100%"}' v-if="tableName=='xinliyisheng'" class="userinfo">
					<image :style='{"width":"120rpx","padding":"0","margin":"0 20rpx 0 0","borderRadius":"100%","height":"120rpx"}' :src="user.touxiang?baseUrl+user.touxiang:require('../../static/gen/upload.png')"></image>
					<view :style='{"width":"auto","flex":"1","flexDirection":"column","justifyContent":"center","display":"flex"}' class="info">
						<view :style='{"width":"auto","lineHeight":"56rpx","fontSize":"36rpx","fontWeight":"600","color":"#fff","textAlign":"center"}'>{{user.yishengxingming}}</view>
						<view :style='{"overflow":"hidden","whiteSpace":"nowrap","color":"rgba(255,255,255,0.85)","width":"100%","lineHeight":"44rpx","fontSize":"24rpx","textOverflow":"ellipsis"}'>{{user.yishengjianjie}}</view>
					</view>
					<view :style='{"margin":"20rpx 0 0","flexDirection":"row","display":"flex","gap":"20rpx","width":"100%","flexFlow":"wrap","justifyContent":"center"}' class="info">
						<view :style='{"padding":"8rpx 24rpx","borderRadius":"20rpx","textAlign":"center","background":"rgba(255,255,255,0.18)","flexDirection":"row","display":"flex","lineHeight":"36rpx","fontSize":"24rpx"}' v-if="user.jf||user.jf==0">
							<span :style='{"color":"#fff"}'>积分：</span>
							<span :style='{"color":"#fff"}'>{{user.jf}}</span>
						</view>
					</view>
				</view>
				<view :style='{"padding":"0","alignItems":"center","top":"30rpx","flexDirection":"row","display":"flex","width":"84rpx","position":"absolute","right":"40rpx","justifyContent":"center","height":"auto"}' class="setting">
					<text class="icon iconfont icon-qita6" :style='{"border":"0","margin":"0 10rpx 0 0","color":"#fff","borderRadius":"0","width":"64rpx","lineHeight":"64rpx","fontSize":"64rpx"}'></text>
					<text :style='{"lineHeight":"2","fontSize":"24rpx","color":"#fff","flex":"none"}'>设置</text>
				</view>
			</view>
			
			<view v-else :style='{"padding":"24rpx 24rpx 60rpx","margin":"0 0 20rpx 0","borderRadius":"0 0 0 100rpx","background":"linear-gradient(160deg, #0a756b 0%, #0e9488 55%, #4eb3a6 100%)","display":"flex","width":"100%","position":"relative","height":"auto"}' @tap="loginClick" class="header" v-bind:class="{'status':isH5Plus}">
				<view :style='{"minHeight":"300rpx","alignItems":"center","color":"#333","display":"flex","width":"100%","fontSize":"36rpx","justifyContent":"center","height":"auto"}'>登录/注册</view>
			</view>
			
			<view :style='{"width":"100%","background":"none","height":"auto"}' class="list">
				
				<view :style='{"width":"100%","padding":"0 24rpx 0 24rpx","height":"auto"}'>
					<view :style='{"width":"100%","padding":"0 20rpx 0 60rpx","background":"linear-gradient(135deg, #0a756b 0%, #0e9488 100%)","justifyContent":"space-between","display":"flex","height":"auto"}'>
						<view :style='{"color":"#fff","fontSize":"28rpx","lineHeight":"72rpx"}'>我的服务</view>
					</view>
					<view class="me-menu-view">
						<block v-for="item in menuList" v-bind:key="item.roleName">
							<block v-if="role==item.roleName" v-bind:key="menu.menu" v-for="(menu,index) in item.backMenu">
								<block v-bind:key="child.tableName" v-for=" (child,sort) in menu.child">
									<view class="me-menu-item" v-if="hasBack(child.tableName)" @tap="onPageTap(getBackMenuUrl(child))" hover-class="hover">
										<view class="me-menu-icon" :class="child.appFrontIcon" :style="{'color': meMenuColor[index]}"></view>
										<view class="text">{{child.menu}}</view>
										<view class="icon iconfont icon-jinru"></view>
									</view>
								</block>
							</block>
						</block>


						<view v-if="user&&user.id" @tap="passwordShow()" class="me-menu-item" hover-class="hover">
							<view class="cuIcon-lock me-menu-icon" :style="{'color': meMenuColor[6]}"></view>
							<view class="text">修改密码</view>
							<view class="icon iconfont icon-jinru"></view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 80px"></view>
		</view>
		<uni-popup class="popup-content" ref="passwordPopup" type="bottom">
			<view class="pwd-panel">
				<view class="pwd-head">
					<view class="pwd-title">修改密码</view>
					<view class="pwd-sub">为保障账号安全，请定期更新密码</view>
				</view>
				<view class="pwd-field">
					<view class="pwd-label">原密码</view>
					<input class="pwd-input" type="password" v-model="passwordForm.mima" placeholder="请输入原密码" placeholder-class="pwd-ph" />
				</view>
				<view class="pwd-field">
					<view class="pwd-label">新密码</view>
					<input class="pwd-input" type="password" v-model="passwordForm.newmima" placeholder="8位以上，含大小写字母和数字" placeholder-class="pwd-ph" />
				</view>
				<view class="pwd-strength" v-if="passwordForm.newmima">
					<view class="pwd-strength-bar">
						<view class="pwd-strength-fill" :class="'lv-' + pwdLevel" :style="{width: pwdWidth}"></view>
					</view>
					<text class="pwd-strength-text" :style="{color: pwdColor}">{{ pwdText }}</text>
				</view>
				<view class="pwd-field">
					<view class="pwd-label">确认密码</view>
					<input class="pwd-input" type="password" v-model="passwordForm.newmima1" placeholder="再次输入新密码" placeholder-class="pwd-ph" />
				</view>
				<button class="pwd-btn" @click="updatePassword">确认修改</button>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import menu from '@/utils/menu'
	export default {
		data() {
			return {
				isH5Plus: true,
				user: {},
				tableName:'',
				role: '',
				menuList: [],
				iconArr: [
					'cuIcon-same',
					'cuIcon-deliver',
					'cuIcon-evaluate',
					'cuIcon-shop',
					'cuIcon-ticket',
					'cuIcon-cascades',
					'cuIcon-discover',
					'cuIcon-question',
					'cuIcon-pic',
					'cuIcon-filter',
					'cuIcon-footprint',
					'cuIcon-pulldown',
					'cuIcon-pullup',
					'cuIcon-moreandroid',
					'cuIcon-refund',
					'cuIcon-qrcode',
					'cuIcon-remind',
					'cuIcon-profile',
					'cuIcon-home',
					'cuIcon-message',
					'cuIcon-link',
					'cuIcon-lock',
					'cuIcon-unlock',
					'cuIcon-vip',
					'cuIcon-weibo',
					'cuIcon-activity',
					'cuIcon-friendadd',
					'cuIcon-friendfamous',
					'cuIcon-friend',
					'cuIcon-goods',
					'cuIcon-selection'
				],
				passwordForm: {
					mima: '',
					newmima: '',
					newmima1: '',
				},
				pwdLevel: 0,
				pwdWidth: '0%',
				pwdColor: '#b0bec5',
				pwdText: '',
				meMenuColor: '#0e9488,#4eb3a6,#7fc7be,#67c23a,#0a756b,#e6a23c,#909399,#0e9488,#4eb3a6,#7fc7be,#0a756b,#67c23a,#909399'.split(','),
			};
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		watch: {
			'passwordForm.newmima'(val) {
				this.calcPwdStrength(val);
			},
		},
		async onLoad(){
			let menus = menu.list();
			this.menuList = menus;
			this.meMenuColor = this.meMenuColor.sort(()=> {
				return (0.5-Math.random());
			});
		},
		async onShow(){
            uni.removeStorageSync("useridTag");
			this.role = uni.getStorageSync("appRole");
			await this.getSession()
			this.tableName = uni.getStorageSync("nowTable");
			let menus = menu.list();
			this.menuList = menus;
			this.$forceUpdate()
		},
		methods: {
			hasBack(tableName) {
				if(tableName == 'exampaper'||tableName == 'examquestion') {
					return false
				}
				if(tableName.indexOf('chapter')!=-1) {
					return false
				}
				return true
			},
			async getSession(){
				let table = uni.getStorageSync("nowTable");
				let res = await this.$api.session(table);
				this.user = res.data;
				this.$forceUpdate()
			},
			loginClick(){
				uni.navigateTo({
					url: '../login/login'
				});
			},
			onPageTap(url) {
                uni.setStorageSync("useridTag",1);
				uni.navigateTo({
					url: url,
					fail: function() {
						uni.switchTab({
							url: url
						});
					}
				});
			},
			getBackMenuUrl(child) {
				const menuJump = child.menuJump ? `&menuJump=${child.menuJump}` : ''
				if (child.tableName == 'examrecord') {
					return `../${child.tableName}/list?menuJump=${child.menuJump || ''}`
				}
				return `../${child.tableName}/list?userid=${this.user.id}${menuJump}`
			},
			hasTranslate(){
				for(let x in this.menuList){
					if(this.menuList[x].roleName == this.role){
						for(let i in this.menuList[x].backMenu){
							if(this.menuList[x].backMenu[i].child.length) {
								for(let j in this.menuList[x].backMenu[i].child) {
									if(this.menuList[x].backMenu[i].child[j].tableName=='hasTranslate'){
										return true
									}
								}
							}
						}
					}
				}
				return false
			},
			
			passwordShow() {
				this.passwordForm = {
					mima: '',
					newmima: '',
					newmima1: '',
				}
				this.pwdLevel = 0
				this.pwdWidth = '0%'
				this.pwdColor = '#b0bec5'
				this.pwdText = ''
				this.$forceUpdate()
				this.$refs.passwordPopup.open()
			},
			calcPwdStrength(val) {
				if (!val) {
					this.pwdLevel = 0
					this.pwdWidth = '0%'
					this.pwdColor = '#b0bec5'
					this.pwdText = ''
					return
				}
				let score = 0
				if (val.length >= 8) score++
				if (/[a-z]/.test(val)) score++
				if (/[A-Z]/.test(val)) score++
				if (/\d/.test(val)) score++
				if (/[^a-zA-Z0-9]/.test(val)) score++
				if (score <= 2) {
					this.pwdLevel = 1
					this.pwdWidth = '33%'
					this.pwdColor = '#e57373'
					this.pwdText = '弱'
				} else if (score == 3) {
					this.pwdLevel = 2
					this.pwdWidth = '66%'
					this.pwdColor = '#f0a35e'
					this.pwdText = '中'
				} else {
					this.pwdLevel = 3
					this.pwdWidth = '100%'
					this.pwdColor = '#0e9488'
					this.pwdText = '强'
				}
			},
			async updatePassword() {
				if (this.passwordForm.mima == ''){
					this.$utils.msg('请输入原密码')
					return false
				}
				if (this.passwordForm.newmima == ''){
					this.$utils.msg('请输入新密码')
					return false
				}
				if (this.passwordForm.newmima1 == ''){
					this.$utils.msg('请再次输入新密码')
					return false
				}
				// 与后端一致的强度校验：至少8位，含大小写字母和数字
				if (this.passwordForm.newmima.length < 8) {
					this.$utils.msg('密码长度不能少于8位')
					return false
				}
				if (!/[a-z]/.test(this.passwordForm.newmima)) {
					this.$utils.msg('密码必须包含小写字母')
					return false
				}
				if (!/[A-Z]/.test(this.passwordForm.newmima)) {
					this.$utils.msg('密码必须包含大写字母')
					return false
				}
				if (!/\d/.test(this.passwordForm.newmima)) {
					this.$utils.msg('密码必须包含数字')
					return false
				}
				if (this.passwordForm.newmima != this.passwordForm.newmima1){
					this.$utils.msg('两次输入的新密码不一致')
					return false
				}
				if (this.passwordForm.mima == this.passwordForm.newmima){
					this.$utils.msg('新密码不能与原密码相同')
					return false
				}
				try {
					await this.$api.updatePassword(this.tableName,{
						oldPassword: this.passwordForm.mima,
						newPassword: this.passwordForm.newmima
					})
				} catch (e) {
					// 原密码错误等由 http 拦截器统一提示
					return false
				}
				this.$refs.passwordPopup.close()
				uni.showModal({
					title: '修改成功',
					content: '密码已修改，请重新登录',
					showCancel: false,
					confirmText: '重新登录',
					success: () => {
						uni.clearStorageSync()
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100vh - 94px);
		box-sizing: border-box;
		background: #f6f8fb;
	}
	.header {
		border-radius: 0 0 28rpx 28rpx !important;
		box-shadow: 0 12rpx 36rpx rgba(42, 55, 78, .14);
	}
	.pwd-panel {
		width: 100%;
		padding: 48rpx 40rpx 80rpx;
		background: #fff;
		border-radius: 32rpx 32rpx 0 0;
		box-sizing: border-box;

		.pwd-head {
			margin-bottom: 40rpx;
			.pwd-title {
				font-size: 36rpx;
				font-weight: 700;
				color: #263238;
			}
			.pwd-sub {
				margin-top: 10rpx;
				font-size: 25rpx;
				color: #90a4ae;
			}
		}

		.pwd-field {
			margin-bottom: 28rpx;
			.pwd-label {
				font-size: 27rpx;
				color: #263238;
				margin-bottom: 14rpx;
			}
			.pwd-input {
				height: 88rpx;
				background: #f2f8f6;
				border-radius: 16rpx;
				padding: 0 28rpx;
				font-size: 28rpx;
				color: #263238;
			}
		}

		.pwd-ph {
			color: #b0bec5;
		}

		.pwd-strength {
			margin: -8rpx 0 28rpx;
			display: flex;
			align-items: center;
			.pwd-strength-bar {
				flex: 1;
				height: 10rpx;
				background: #eef2f5;
				border-radius: 6rpx;
				overflow: hidden;
				.pwd-strength-fill {
					height: 100%;
					border-radius: 6rpx;
					transition: width .3s ease;
					&.lv-1 { background: #e57373; }
					&.lv-2 { background: #f0a35e; }
					&.lv-3 { background: #0e9488; }
				}
			}
			.pwd-strength-text {
				margin-left: 20rpx;
				font-size: 25rpx;
				min-width: 48rpx;
				text-align: right;
			}
		}

		.pwd-btn {
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
	}
	.me-menu-view {
		padding: 8rpx 24rpx;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		height: auto;
		border-radius: 20rpx;
		.me-menu-item {
			display: flex;
			width: 100%;
			border-color: #eeeeee;
			border-width: 0 0 2rpx 0;
			align-items: center;
			border-style: solid;
			height: auto;
			.me-menu-icon {
				color: rgba(0, 186, 189, 1);
				font-size: 60rpx;
				line-height: 1;
			}
			.text {
				padding: 0 20rpx;
				color: #263238;
				flex: 1;
				width: 100%;
				font-size: 28rpx;
				line-height: 100rpx;
			}
			.icon {
				color: #999;
				width: 28rpx;
				font-size: 28rpx;
				line-height: 28rpx;
			}
		}
	}
</style>
