<template>
<view class="content">
	<view class="register-box" :style="{'backgroundImage': indexBgUrl?`url(${$base.url + indexBgUrl})`:''}">
		<view :style='{"width":"100%","padding":"0","position":"relative","borderRadius":"20rpx","background":"none","height":"auto"}'>
			<image :style='{"width":"160rpx","margin":"0 auto 24rpx auto","borderRadius":"8rpx","display":"block","height":"160rpx"}' :src="indexLogoUrl?($base.url + indexLogoUrl):'/static/logo.png'" mode="aspectFill"></image>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">手机号：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.shouji" v-model="ruleForm.shouji"  type="text"  class="uni-input" name="" placeholder="请输入手机号（登录账号）" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">密码：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.mima" v-model="ruleForm.mima" type="password"  class="uni-input" name="" placeholder="密码" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">确认密码：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' v-model="ruleForm.mima2" type="password" class="uni-input" name="" placeholder="确认密码" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">用户姓名：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yonghuxingming" v-model="ruleForm.yonghuxingming"  type="text"  class="uni-input" name="" placeholder="用户姓名" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">性别：</view>
				<picker :style='{"width":"100%","margin":"0","display":"flex","height":"auto"}' v-if="tableName=='yonghu'" :disabled="ro.xingbie" @change="yonghuxingbieChange" :value="yonghuxingbieIndex" :range="yonghuxingbieOptions">
					<view>
						<view :style='{"padding":"0 20rpx","lineHeight":"80rpx","fontSize":"28rpx","color":"#5f576d","flex":"1"}' class="uni-input">{{ruleForm.xingbie?ruleForm.xingbie:"请选择性别"}}</view>
					</view>
				</picker>
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" @tap="yonghutouxiangTap" class="">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">头像：</view>
				<image :style='{"width":"120rpx","margin":"10rpx 0 10rpx 0","borderRadius":"16rpx","display":"block","height":"120rpx"}' v-if="ruleForm.touxiang" class="avator" :src="baseUrl+ruleForm.touxiang" mode=""></image>
				<image :style='{"width":"120rpx","margin":"10rpx 0 10rpx 0","borderRadius":"16rpx","display":"block","height":"120rpx"}' v-else class="avator" src="../../static/gen/upload.png" mode=""></image>
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">医生工号：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishenggonghao" v-model="ruleForm.yishenggonghao"  type="text"  class="uni-input" name="" placeholder="医生工号" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">密码：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.mima" v-model="ruleForm.mima" type="password"  class="uni-input" name="" placeholder="密码" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">确认密码：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' v-model="ruleForm.mima2" type="password" class="uni-input" name="" placeholder="确认密码" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">医生姓名：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishengxingming" v-model="ruleForm.yishengxingming"  type="text"  class="uni-input" name="" placeholder="医生姓名" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">性别：</view>
				<picker :style='{"width":"100%","margin":"0","display":"flex","height":"auto"}' v-if="tableName=='xinliyisheng'" :disabled="ro.xingbie" @change="xinliyishengxingbieChange" :value="xinliyishengxingbieIndex" :range="xinliyishengxingbieOptions">
					<view>
						<view :style='{"padding":"0 20rpx","lineHeight":"80rpx","fontSize":"28rpx","color":"#5f576d","flex":"1"}' class="uni-input">{{ruleForm.xingbie?ruleForm.xingbie:"请选择性别"}}</view>
					</view>
				</picker>
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" @tap="xinliyishengtouxiangTap" class="">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">头像：</view>
				<image :style='{"width":"120rpx","margin":"10rpx 0 10rpx 0","borderRadius":"16rpx","display":"block","height":"120rpx"}' v-if="ruleForm.touxiang" class="avator" :src="baseUrl+ruleForm.touxiang" mode=""></image>
				<image :style='{"width":"120rpx","margin":"10rpx 0 10rpx 0","borderRadius":"16rpx","display":"block","height":"120rpx"}' v-else class="avator" src="../../static/gen/upload.png" mode=""></image>
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="uni-form-item uni-column">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">电话号码：</view>
				<input :style='{"border":"none","padding":"0px 24rpx","margin":"0px","color":"#263238","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.dianhuahaoma" v-model="ruleForm.dianhuahaoma"  type="text"  class="uni-input" name="" placeholder="电话号码" />
			</view>
			<view :style='{"margin":"0 0 20rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderRadius":"60rpx","borderWidth":"0 0 0px 0","background":"rgba(255,255,255,0.72)","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="" v-if="tableName=='xinliyisheng'">
				<view :style='{"padding":"0 20rpx 0 40rpx","color":"#263238","borderRadius":"0px 60rpx 60rpx 0px","textAlign":"center","background":"none","flex":"none","width":"auto","lineHeight":"50rpx","fontSize":"28rpx","height":"50rpx"}' class="label">医生简介：</view>
				<textarea :style='{"border":"0","padding":"24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"240rpx"}' v-model="ruleForm.yishengjianjie" placeholder="医生简介"></textarea>
			</view>
			<button :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a680 3%,#0e948860 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' class="btn-submit" @tap="register" type="primary">注册</button>
			
			<view class="idea1" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea1</view>
			<view class="idea2" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea2</view>
			<view class="idea3" :style='{"width":"100%","background":"red","display":"none","height":"80rpx"}'>idea3</view>
		</view>
	</view>
</view>
</template>

<script>
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect";
	export default {
		data() {
			return {
				yonghuxingbieOptions: [],
				yonghuxingbieIndex: 0,
				xinliyishengxingbieOptions: [],
				xinliyishengxingbieIndex: 0,
				ruleForm: {
				yonghuzhanghao: '',
				mima: '',
				yonghuxingming: '',
				xingbie: '',
				touxiang: '',
				shouji: '',
				yishenggonghao: '',
				mima: '',
				yishengxingming: '',
				xingbie: '',
				touxiang: '',
				dianhuahaoma: '',
				yishengjianjie: '',
				storeupnum: '',
				},
				ro: {},
				tableName:"",
				indexBgUrl: '',
				indexLogoUrl: '',
			}
		},
		components: {
			multipleSelect
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onLoad() {
			let res = [];
			let table = uni.getStorageSync("loginTable");
			this.tableName = table;

			if(this.tableName=='yonghu'){
				// 自定义下拉框值
				this.yonghuxingbieOptions = "男,女".split(',');
				this.ruleForm.xingbie=''
				this.ro = {
					yonghuzhanghao: false,
					mima: false,
					yonghuxingming: false,
					xingbie: false,
					touxiang: false,
					shouji: false,
				}
			}
			if(this.tableName=='xinliyisheng'){
				// 自定义下拉框值
				this.xinliyishengxingbieOptions = "男,女".split(',');
				this.ruleForm.xingbie=this.xinliyishengxingbieOptions[0]
				this.ro = {
					yishenggonghao: false,
					mima: false,
					yishengxingming: false,
					xingbie: false,
					touxiang: false,
					dianhuahaoma: false,
					yishengjianjie: false,
					storeupnum: false,
				}
			}
			
			this.styleChange()
		},
		methods: {

			// 下拉变化
			yonghuxingbieChange(e) {
					this.yonghuxingbieIndex = e.target.value
					this.ruleForm.xingbie = this.yonghuxingbieOptions[this.yonghuxingbieIndex]
			},
			yonghutouxiangTap() {
				if(this.ro.touxiang) {
					return false
				}
				let _this = this;
				this.$api.upload(function(res) {
					_this.ruleForm.touxiang = 'upload/' + res.file;
					_this.$forceUpdate();
				});
			},
			// 下拉变化
			xinliyishengxingbieChange(e) {
					this.xinliyishengxingbieIndex = e.target.value
					this.ruleForm.xingbie = this.xinliyishengxingbieOptions[this.xinliyishengxingbieIndex]
			},
			xinliyishengtouxiangTap() {
				if(this.ro.touxiang) {
					return false
				}
				let _this = this;
				this.$api.upload(function(res) {
					_this.ruleForm.touxiang = 'upload/' + res.file;
					_this.$forceUpdate();
				});
			},
			toggleTab(str,str1) {
				if(this.ro[str1]){
					return false
				}
				this.$refs[str + str1].show();
			},

			async styleChange() {
				let rs = await this.$api.getPublic('config/info?name=appRegisterBackgroudImg')
				this.indexBgUrl = rs.data?rs.data.value:''
				rs = await this.$api.getPublic('config/info?name=appRegLogo')
				this.indexLogoUrl = rs.data?rs.data.value:''
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			// 注册
			async register() {
				
				if((!this.ruleForm.shouji) && `yonghu` == this.tableName){
					this.$utils.msg(`手机号不能为空`);
					return
				}
				if(`yonghu` == this.tableName && !this.$validate.isMobile(this.ruleForm.shouji)){
					this.$utils.msg(`请输入正确的手机号`);
					return
				}
				if((!this.ruleForm.mima) && `yonghu` == this.tableName){
					this.$utils.msg(`密码不能为空`);
					return
				}
				if(`yonghu` == this.tableName && (this.ruleForm.mima!=this.ruleForm.mima2)){
					this.$utils.msg(`两次密码输入不一致`);
					return
				}
				if((!this.ruleForm.yonghuxingming) && `yonghu` == this.tableName){
					this.$utils.msg(`用户姓名不能为空`);
					return
				}
				if((!this.ruleForm.yishenggonghao) && `xinliyisheng` == this.tableName){
					this.$utils.msg(`医生工号不能为空`);
					return
				}
				if((!this.ruleForm.mima) && `xinliyisheng` == this.tableName){
					this.$utils.msg(`密码不能为空`);
					return
				}
				if(`xinliyisheng` == this.tableName && (this.ruleForm.mima!=this.ruleForm.mima2)){
					this.$utils.msg(`两次密码输入不一致`);
					return
				}
				if((!this.ruleForm.yishengxingming) && `xinliyisheng` == this.tableName){
					this.$utils.msg(`医生姓名不能为空`);
					return
				}
				if(`xinliyisheng` == this.tableName && this.ruleForm.dianhuahaoma&&(!this.$validate.isMobile(this.ruleForm.dianhuahaoma))){
					this.$utils.msg(`电话号码应输入手机格式`);
					return
				}
				if(`xinliyisheng` == this.tableName && this.ruleForm.storeupnum&&(!this.$validate.isIntNumer(this.ruleForm.storeupnum))){
					this.$utils.msg(`收藏数应输入整数`);
					return
				}
				await this.$api.register(`${this.tableName}`, this.ruleForm);
				this.$utils.msgBack('注册成功');;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
	}
	.register-box{
		padding: 0 80rpx 0 80rpx;
		background: linear-gradient(165deg, #0a756b 0%, #0e9488 45%, #4eb3a6 100%);
		display: flex;
		width: 100%;
		min-height: 100vh;
		align-items: center;
		height: auto;
	}
</style>
