<template>
<view class="content">
	<view class="box" :style='{"minHeight":"100%","width":"100%","padding":"0","position":"relative","background":"#fff","height":"auto"}'>
		<view :style='{"width":"100%","padding":"24rpx","background":"none","display":"block","height":"auto"}'>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>用户账号</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yonghuzhanghao"  v-model="ruleForm.yonghuzhanghao" placeholder="用户账号"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>用户姓名</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yonghuxingming"  v-model="ruleForm.yonghuxingming" placeholder="用户姓名"></input>
			</view>
			<view v-if="tableName=='yonghu'" :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class=" select">
				<view :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">性别</view>
				<picker :style='{"width":"100%","flex":"1","height":"auto"}' :disabled="ro.xingbie" @change="yonghuxingbieChange" :value="yonghuxingbieIndex" :range="yonghuxingbieOptions">
					<view :style='{"width":"100%","lineHeight":"80rpx","fontSize":"28rpx","color":"#fff"}' class="uni-input picker-select-input">{{ruleForm.xingbie?ruleForm.xingbie:"请选择性别"}}</view>
				</picker>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" @tap="yonghutouxiangTap" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>头像</view>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' v-if="ruleForm.touxiang" style="margin: 0;" class="avator" :src="baseUrl+ruleForm.touxiang" mode=""></image>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' v-else class="avator" style="margin: 0;" src="../../static/gen/upload.png" mode=""></image>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='yonghu'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>手机</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.shouji"  v-model="ruleForm.shouji" placeholder="手机"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>医生工号</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishenggonghao"  v-model="ruleForm.yishenggonghao" placeholder="医生工号"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>医生姓名</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishengxingming"  v-model="ruleForm.yishengxingming" placeholder="医生姓名"></input>
			</view>
			<view v-if="tableName=='xinliyisheng'" :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class=" select">
				<view :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">性别</view>
				<picker :style='{"width":"100%","flex":"1","height":"auto"}' :disabled="ro.xingbie" @change="xinliyishengxingbieChange" :value="xinliyishengxingbieIndex" :range="xinliyishengxingbieOptions">
					<view :style='{"width":"100%","lineHeight":"80rpx","fontSize":"28rpx","color":"#fff"}' class="uni-input picker-select-input">{{ruleForm.xingbie?ruleForm.xingbie:"请选择性别"}}</view>
				</picker>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" @tap="xinliyishengtouxiangTap" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>头像</view>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' v-if="ruleForm.touxiang" style="margin: 0;" class="avator" :src="baseUrl+ruleForm.touxiang" mode=""></image>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' v-else class="avator" style="margin: 0;" src="../../static/gen/upload.png" mode=""></image>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' v-if="tableName=='xinliyisheng'" class="">
				<view class="title" :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}'>电话号码</view>
				<input :style='{"border":"0","padding":"0px 24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.dianhuahaoma"  v-model="ruleForm.dianhuahaoma" placeholder="电话号码"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0  0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="" v-if="tableName=='xinliyisheng'">
				<view :style='{"padding":"0 20rpx 0 20rpx","whiteSpace":"nowrap","color":"#727272","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">医生简介</view>
				<textarea :disabled="ro.yishengjianjie" :style='{"border":"0","padding":"24rpx","margin":"0px","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"240rpx"}' v-model="ruleForm.yishengjianjie" placeholder="医生简介"></textarea>
			</view>
			<view :style='{"padding":"0","margin":"40rpx 0 0 0","flexWrap":"wrap","display":"flex","width":"100%","justifyContent":"center","height":"auto"}' class="btn">
				<button @tap="update()" class="cu-btn lg" :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","height":"80rpx"}'>保存</button>
				<button @tap="logout()" class="cu-btn lg" :style='{"border":"2rpx solid #0e948850","padding":"0px","margin":"0 0 24rpx 0","color":"#A183E5","borderRadius":"40rpx","background":"none","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"500","height":"80rpx"}'>退出登录</button>
			</view>
		</view>
	</view>
</view>
</template>

<script>

	import xiaEditor from '@/components/xia-editor/xia-editor';
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect";
	export default {
		data() {
			return {
				ruleForm: {
				},
				tableName:"",
				ro: {},
				yonghuxingbieOptions: [],
				yonghuxingbieIndex: 0,
				xinliyishengxingbieOptions: [],
				xinliyishengxingbieIndex: 0,
			}
		},
		components: {
			multipleSelect,
			xiaEditor
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			}
		},
		async onLoad() {
			let table = uni.getStorageSync("nowTable");
			let that = this
			let res = {}
			this.tableName = table;
			this.getSession()
			if(this.tableName=='yonghu'){
				// 自定义下拉框值
				this.yonghuxingbieOptions = "男,女".split(',');
				this.yonghuxingbieOptions.forEach((item, index) => {
					if(item==this.ruleForm.xingbie) {
						this.yonghuxingbieIndex = index;
					}
				});
				this.ro = {
					yonghuzhanghao: true,
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
				this.xinliyishengxingbieOptions.forEach((item, index) => {
					if(item==this.ruleForm.xingbie) {
						this.xinliyishengxingbieIndex = index;
					}
				});
				this.ro = {
					yishenggonghao: true,
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
			this.$forceUpdate()
		},
		methods: {
			async getSession(){
				let res = await this.$api.session(this.tableName)
				this.ruleForm = res.data;
				uni.setStorageSync('userSession',JSON.stringify(res.data))
			},
			// 下拉变化
			yonghuxingbieChange(e) {
				this.yonghuxingbieIndex = e.target.value
				this.ruleForm.xingbie = this.yonghuxingbieOptions[this.yonghuxingbieIndex]
			},
			yonghutouxiangTap() {
				if(this.ro.touxiang){
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
				if(this.ro.touxiang){
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

			styleChange() {
				this.$nextTick(()=>{
					// document.querySelectorAll('. .uni-input-input').forEach(el=>{
					//   el.style.backgroundColor = this.userInfoForm.list.input.backgroundColor
					// })
				})
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			logout() {
				uni.clearStorageSync()
				this.$utils.jump('../login/login');
			},
			// 注册
			async update() {
				if(`yonghu` == this.tableName&&(!this.ruleForm.yonghuzhanghao)){
					this.$utils.msg(`用户账号不能为空`);
					return
				}
				if(`yonghu` == this.tableName&&(!this.ruleForm.yonghuxingming)){
					this.$utils.msg(`用户姓名不能为空`);
					return
				}
				if(`yonghu` == this.tableName && this.ruleForm.shouji&&(!this.$validate.isMobile(this.ruleForm.shouji))){
					this.$utils.msg(`手机应输入手机格式`);
					return
				}
				if(`xinliyisheng` == this.tableName&&(!this.ruleForm.yishenggonghao)){
					this.$utils.msg(`医生工号不能为空`);
					return
				}
				if(`xinliyisheng` == this.tableName&&(!this.ruleForm.yishengxingming)){
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
				let table = uni.getStorageSync("nowTable");
				await this.$api.update(table, this.ruleForm);
				this.$utils.msgBack('修改成功');;
				this.getSession()
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
