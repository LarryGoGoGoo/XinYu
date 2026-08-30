<template>
	<view class="content">
		<view class="box" :style='{"width":"100%","padding":"24rpx","background":"#fff","height":"100%"}' v-if="type==1">
			<view :style='{"width":"100%","padding":"24rpx","display":"block","height":"auto"}'>
				<view class="forget-input" :style='{"width":"100%","margin":"0 0 24rpx 0","height":"auto"}'>
					<input v-model="username" :style='{"padding":"0px 24rpx","margin":"0px","borderColor":"#e5f4f1","color":"#666","borderRadius":"0","background":"none","borderWidth":"0 0 2rpx 0","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"88rpx"}' type="text" placeholder="请输入您的账号" />
				</view>
				<picker :style='{"width":"100%","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","borderStyle":"solid","borderWidth":"0 0 2rpx 0","height":"auto"}' @change="optionsChange" :value="index" :range="options">
					<view class="uni-input" :style='{"width":"100%","lineHeight":"88rpx","fontSize":"28rpx","color":"#666"}'>{{options[index]}}</view>
				</picker>
				<button class="landing" :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126.77deg, rgb(78, 179, 166) 2.814%,rgb(14, 148, 136) 97.456%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' @tap="nextClick" type="primary">下一步</button>
			</view>
		</view>
		<view class="box" :style='{"width":"100%","padding":"24rpx","background":"#fff","height":"100%"}' v-if="type==2">
			<view :style='{"width":"100%","padding":"24rpx","display":"block","height":"auto"}'>
				<view class="forget-input" :style='{"width":"100%","margin":"0 0 24rpx 0","height":"auto"}'>
					<input v-model="userForm.pquestion"  :style='{"padding":"0px 24rpx","margin":"0px","borderColor":"#e5f4f1","color":"#666","borderRadius":"0","background":"none","borderWidth":"0 0 2rpx 0","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"88rpx"}' type="text" placeholder="密保问题" disabled="disabled"/>
				</view>
				<view class="forget-input" :style='{"width":"100%","margin":"0 0 24rpx 0","height":"auto"}'>
					<input v-model="panswer1" :style='{"padding":"0px 24rpx","margin":"0px","borderColor":"#e5f4f1","color":"#666","borderRadius":"0","background":"none","borderWidth":"0 0 2rpx 0","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"88rpx"}' type="text" placeholder="密保答案" />
				</view>
				<button class="landing" :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126.77deg, rgb(78, 179, 166) 2.814%,rgb(14, 148, 136) 97.456%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' @tap="confirmClick" type="primary">确定</button>
			</view>
		</view>
		<view class="box" :style='{"width":"100%","padding":"24rpx","background":"#fff","height":"100%"}' v-if="type==3">
			<view :style='{"width":"100%","padding":"24rpx","display":"block","height":"auto"}'>
				<view class="forget-input" :style='{"width":"100%","margin":"0 0 24rpx 0","height":"auto"}'>
					<input v-model="password" :style='{"padding":"0px 24rpx","margin":"0px","borderColor":"#e5f4f1","color":"#666","borderRadius":"0","background":"none","borderWidth":"0 0 2rpx 0","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"88rpx"}' type="password" placeholder="密码" />
				</view>
				<view class="forget-input" :style='{"width":"100%","margin":"0 0 24rpx 0","height":"auto"}'>
					<input v-model="repassword" :style='{"padding":"0px 24rpx","margin":"0px","borderColor":"#e5f4f1","color":"#666","borderRadius":"0","background":"none","borderWidth":"0 0 2rpx 0","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"88rpx"}' type="password" placeholder="确认密码" />
				</view>
				<button class="landing" :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126.77deg, rgb(78, 179, 166) 2.814%,rgb(14, 148, 136) 97.456%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' @tap="updateClick" type="primary">修改密码</button>
			</view>
		</view>
	</view>
</template>

<script>
	import menu from '@/utils/menu'

	export default {
		data() {
			return {
				options: [
					'请选择登录用户类型',
				],
				optionsValues: [
					'',
				],
				index: 0,
				tableName: '',
				type: 1,
				repassword: '',
				password: '',
				panswer1: '',
				username: '',
				userForm: {
				}
			}
		},
		onLoad() {
			this.initRoleOptions()
			this.styleChange()
		},
		methods: {
			initRoleOptions() {
				const options = ['请选择登录用户类型']
				const optionsValues = ['']
				menu.list().forEach(item => {
					if (item.hasFrontLogin === '是' || item.hasBackLogin === '是') {
						options.push(item.roleName)
						optionsValues.push(item.tableName)
					}
				})
				this.options = options
				this.optionsValues = optionsValues
			},
			async nextClick() {
				if(!this.username) {
					this.$utils.msg('请输入账号')
					return;
				}
				if(this.optionsValues[this.index]=="") {
					this.$utils.msg('请选择角色')
					return;
				}
				this.tableName = this.optionsValues[this.index];
				let res = await this.$api.security(this.tableName,{
					username: this.username
				})
				if(!res.data) {
					this.$utils.msg('用户不存在')
					return false
				}
				if (res.code == 0) {
					if (res.data.recoverySupported === false || !res.data.pquestion) {
						this.$utils.msg(res.data.recoveryMessage || '当前账号未配置密保找回')
						return false
					}
					this.userForm = res.data
					this.type = 2
				}
			},
			optionsChange(e) {
				this.index = e.target.value
			},
			styleChange() {
				this.$nextTick(()=>{
					// document.querySelectorAll('.forget-input .uni-input-input').forEach(el=>{
					//   el.style.backgroundColor = this.restPwFrom.content.input.backgroundColor
					// })
				})
			},
			confirmClick() {
				if (!this.panswer1) {
					this.$utils.msg('请输入密保答案')
					return false
				}
				this.password = ''
				this.type = 3
			},
			async updateClick() {
				if(!this.password) {
					this.$utils.msg('密码不能为空')
					return false
				}
				if (this.password != this.repassword) {
					this.$utils.msg('两次密码输入不一致')
					return false
				}
				await this.$api.recoveryPassword(this.tableName, {
					username: this.username,
					panswer: this.panswer1,
					newPassword: this.password
				})
				this.$utils.msg('密码修改成功')
				setTimeout(() => {
					uni.navigateBack({
			
					})
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
	}
</style>
