  

<template>
<view class="content">
	<view :style='{"minHeight":"100%","width":"100%","padding":"0 24rpx 0 24rpx","position":"relative","background":"#fff","height":"auto"}' v-if="showType==1">
		<form :style='{"width":"100%","padding":"24rpx","background":"none","display":"block","height":"auto"}' class="app-update-pv">


			<view class="appointment-flow">
				<view class="flow-step done">
					<view class="flow-dot">1</view>
					<view class="flow-text">选择医生</view>
				</view>
				<view class="flow-line active"></view>
				<view class="flow-step active">
					<view class="flow-dot">2</view>
					<view class="flow-text">填写预约</view>
				</view>
				<view class="flow-line"></view>
				<view class="flow-step">
					<view class="flow-dot">3</view>
					<view class="flow-text">等待确认</view>
				</view>
			</view>

			<view class="appointment-summary" v-if="ruleForm.yishengxingming || ruleForm.yishenggonghao">
				<view class="summary-title">预约信息</view>
				<view class="summary-main">
					<image class="summary-avatar" v-if="ruleForm.zixunfengmian" :src="ruleForm.zixunfengmian.substring(0,4)=='http'?ruleForm.zixunfengmian:baseUrl+ruleForm.zixunfengmian.split(',')[0]" mode="aspectFill"></image>
					<view class="summary-avatar placeholder" v-else>医</view>
					<view class="summary-copy">
						<view class="summary-name">{{ruleForm.yishengxingming || '心理医生'}}</view>
						<view class="summary-meta">工号：{{ruleForm.yishenggonghao || '待选择'}}</view>
						<view class="summary-meta" v-if="appointmentDoctor.dianhuahaoma">电话：{{appointmentDoctor.dianhuahaoma}}</view>
					</view>
				</view>
			</view>





			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">医生工号</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishenggonghao" v-model="ruleForm.yishenggonghao" placeholder="医生工号"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">医生姓名</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yishengxingming" v-model="ruleForm.yishengxingming" placeholder="医生姓名"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">咨询名称</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.zixunmingcheng" v-model="ruleForm.zixunmingcheng" placeholder="咨询名称"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">咨询类型</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.zixunleixing" v-model="ruleForm.zixunleixing" placeholder="咨询类型"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="" @tap="zixunfengmianTap">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">咨询封面</view>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' class="avator" v-if="ruleForm.zixunfengmian" :src="ruleForm.zixunfengmian.substring(0,4)=='http'?ruleForm.zixunfengmian:baseUrl+ruleForm.zixunfengmian.split(',')[0]" mode="aspectFill"></image>
				<image :style='{"width":"80rpx","borderRadius":"100%","objectFit":"cover","display":"block","height":"80rpx"}' class="avator" v-else src="../../static/gen/upload.png" mode="aspectFill"></image>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">咨询地址</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.zixundizhi" v-model="ruleForm.zixundizhi" placeholder="咨询地址"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class=" select">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">预约时段</view>
				<picker :disabled="ro.yuyueshiduan" :style='{"width":"100%","flex":"1","height":"auto"}' @change="yuyueshiduanChange" :value="yuyueshiduanIndex" :range="yuyueshiduanOptions">
					<view :style='{"width":"100%","lineHeight":"80rpx","fontSize":"28rpx","color":"#4eb3a6"}' class="uni-input">{{ruleForm.yuyueshiduan?ruleForm.yuyueshiduan:"请选择预约时段"}}</view>
				</picker>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">用户账号</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yonghuzhanghao" v-model="ruleForm.yonghuzhanghao" placeholder="用户账号"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">用户姓名</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yonghuxingming" v-model="ruleForm.yonghuxingming" placeholder="用户姓名"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">预约时间</view>
				<input :disabled="ro.yuyueshijian" :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' v-model="ruleForm.yuyueshijian" placeholder="预约时间" @tap="toggleTab('yuyueshijian')"></input>
			</view>
            
			
			<view :style='{"padding":"0","margin":"40rpx 0 0 0","flexWrap":"wrap","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}' class="btn" >
				<button :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' @tap="onSubmitTap(null)" class="bg-red">提交</button>
			</view>
		</form>
		<w-picker  mode="date" step="1" :current="false" :hasSecond="false" @confirm="yuyueshijianConfirm" ref="yuyueshijian" themeColor="#333333"></w-picker>
	</view>
</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import xiaEditor from '@/components/xia-editor/xia-editor';
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect";
	export default {
		data() {
			return {
				cross:'',
				ruleForm: {
				yishenggonghao: '',
				yishengxingming: '',
				zixunmingcheng: '',
				zixunleixing: '',
				zixunfengmian: '',
				zixundizhi: '',
				yuyueshiduan: '',
				yonghuzhanghao: '',
				yonghuxingming: '',
				yuyueshijian: '',
				shhf: '',
				},
				yuyueshiduanOptions: [],
				yuyueshiduanIndex: 0,
				appointmentDoctor: {},
				submitting: false,
				// 登录用户信息
				user: {},
				ro:{
				   yishenggonghao : false,
				   yishengxingming : false,
				   zixunmingcheng : false,
				   zixunleixing : false,
				   zixunfengmian : false,
				   zixundizhi : false,
				   yuyueshiduan : false,
				   yonghuzhanghao : false,
				   yonghuxingming : false,
				   yuyueshijian : false,
				   sfsh : false,
				   shhf : false,
				},
				virtualPay: false,
				showType: 1,
			}
		},
		components: {
			wPicker,
			xiaEditor,
			multipleSelect,
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
			sessionForm() {
				return uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
			},



		},
		async onLoad(options) {
			if(options.virtualPay){
				this.virtualPay = true
			}
			this.ruleForm.yuyueshijian = this.$utils.getCurDate();
			let table = uni.getStorageSync("nowTable");
			// 获取用户信息
			let res = await this.$api.session(table);
			this.user = res.data;
			
			// ss读取
			this.ruleForm.yonghuzhanghao = this.user.yonghuzhanghao
			this.ro.yonghuzhanghao = true;
			this.ruleForm.yonghuxingming = this.user.yonghuxingming
			this.ro.yonghuxingming = true;

			// 跨表
			this.cross = options.cross;
			if(options.cross){
				var obj = uni.getStorageSync('crossObj') || {};
				this.appointmentDoctor = obj || {};
				if(obj && obj.yishengxingming && !obj.zixunmingcheng) {
					obj.zixunmingcheng = `${obj.yishengxingming}心理咨询预约`;
				}
				if(obj && !obj.zixunleixing) {
					obj.zixunleixing = '心理咨询';
				}
				if(obj && !obj.zixunfengmian && obj.touxiang) {
					obj.zixunfengmian = obj.touxiang.split(",")[0];
				}
				if(obj && !obj.zixundizhi) {
					obj.zixundizhi = '线上咨询';
				}
				for (var o in obj){
					if(o=='yishenggonghao'){
						this.ruleForm.yishenggonghao = obj[o];
						this.ro.yishenggonghao = true;
						continue;
					}
					if(o=='yishengxingming'){
						this.ruleForm.yishengxingming = obj[o];
						this.ro.yishengxingming = true;
						continue;
					}
					if(o=='zixunmingcheng'){
						this.ruleForm.zixunmingcheng = obj[o];
						this.ro.zixunmingcheng = true;
						continue;
					}
					if(o=='zixunleixing'){
						this.ruleForm.zixunleixing = obj[o];
						this.ro.zixunleixing = true;
						continue;
					}
					if(o=='zixunfengmian'){
						this.ruleForm.zixunfengmian = obj[o].split(",")[0];
						this.ro.zixunfengmian = true;
						continue;
					}
					if(o=='zixundizhi'){
						this.ruleForm.zixundizhi = obj[o];
						this.ro.zixundizhi = true;
						continue;
					}
					if(o=='yuyueshiduan'){
						this.ruleForm.yuyueshiduan = obj[o];
						for(let x in this.yuyueshiduanOptions) {
							if(this.yuyueshiduanOptions[x] == this.ruleForm.yuyueshiduan) {
								this.yuyueshiduanIndex = Number(x)
							}
						}
						this.ro.yuyueshiduan = true;
						continue;
					}
					if(o=='yonghuzhanghao'){
						this.ruleForm.yonghuzhanghao = obj[o];
						this.ro.yonghuzhanghao = true;
						continue;
					}
					if(o=='yonghuxingming'){
						this.ruleForm.yonghuxingming = obj[o];
						this.ro.yonghuxingming = true;
						continue;
					}
					if(o=='yuyueshijian'){
						this.ruleForm.yuyueshijian = obj[o];
						this.ro.yuyueshijian = true;
						continue;
					}
				}
			}

			var yuyueshiduanRefParams = {}
			// 下拉框
			res = await this.$api.option(`yuyueshiduan`,`yuyueshiduan`,yuyueshiduanRefParams);
			this.yuyueshiduanOptions = res.data;
			this.yuyueshiduanOptions.unshift("请选择预约时段");
			if(this.ruleForm.yuyueshiduan) {
				for(let x in this.yuyueshiduanOptions) {
					if(this.yuyueshiduanOptions[x] == this.ruleForm.yuyueshiduan) {
						this.yuyueshiduanIndex = Number(x)
					}
				}
			}

			// 如果有登录，获取登录后保存的userid
			this.ruleForm.userid = uni.getStorageSync("appUserid")
			if (options.refid) {
				// 如果上一级页面传递了refid，获取改refid数据信息
				this.ruleForm.refid = Number(options.refid);
				this.ruleForm.nickname = uni.getStorageSync("nickname");
			}
			// 如果是更新操作
			if (options.id) {
				this.ruleForm.id = options.id;
				// 获取信息
				res = await this.$api.info(`yuyuezixun`, this.ruleForm.id);
				if(res.data.yuyueshiduan) {
					for(let x in this.yuyueshiduanOptions) {
						if(this.yuyueshiduanOptions[x] == res.data.yuyueshiduan) {
							this.yuyueshiduanIndex = Number(x)
						}
					}
				}
				this.ruleForm = res.data;
			}
			this.$forceUpdate()
			if (uni.getStorageSync('raffleType') && uni.getStorageSync('raffleType') != null) {
				uni.removeStorageSync('raffleType')
				setTimeout(() => {
					this.onSubmitTap(null)
				}, 300)
			}
		},
		methods: {
			numberChange(e) {
				e = Number(e)
			},

			// 多级联动参数

			yuyueshijianChange(e) {
				this.ruleForm.yuyueshijian = e.target.value;
				this.$forceUpdate();
			},

			// 日长控件选择日期时间
			yuyueshijianConfirm(val) {
				this.ruleForm.yuyueshijian = val.result;
				this.$forceUpdate();
			},

			// 下拉变化
			yuyueshiduanChange(e) {
				this.yuyueshiduanIndex = e.target.value
				this.ruleForm.yuyueshiduan = this.yuyueshiduanOptions[this.yuyueshiduanIndex]
			},

			zixunfengmianTap() {
				if(this.ro.zixunfengmian){
					return false
				}
				let _this = this;
				this.$api.upload(function(res) {
					_this.ruleForm.zixunfengmian = 'upload/' + res.file;
					_this.$forceUpdate();
				});
			},

			getUUID () {
				return new Date().getTime();
			},
			validateAppointment() {
				if(!this.ruleForm.yishenggonghao || !this.ruleForm.yishengxingming) {
					this.$utils.msg('请先选择心理医生');
					return false;
				}
				if(!this.ruleForm.zixunmingcheng) {
					this.$utils.msg('请填写咨询名称');
					return false;
				}
				if(!this.ruleForm.zixunleixing) {
					this.$utils.msg('请填写咨询类型');
					return false;
				}
				if(!this.ruleForm.yuyueshijian) {
					this.$utils.msg('请选择预约时间');
					return false;
				}
				if(!this.ruleForm.yuyueshiduan || this.ruleForm.yuyueshiduan === '请选择预约时段' || Number(this.yuyueshiduanIndex) === 0) {
					this.$utils.msg('请选择预约时段');
					return false;
				}
				if(!this.ruleForm.yonghuzhanghao || !this.ruleForm.yonghuxingming) {
					this.$utils.msg('用户信息缺失，请重新登录');
					return false;
				}
				return true;
			},
			async onSubmitTap(subMitType=null) {
				if(this.submitting) {
					return false;
				}
				if(!this.validateAppointment()) {
					return false;
				}
				this.submitting = true;
				let that = this
				try {
					//跨表计算判断
					var obj;
					//更新跨表属性
					var crossuserid;
					var crossrefid;
					var crossoptnum;
					if(this.cross){
						var statusColumnName = uni.getStorageSync('statusColumnName');
						var statusColumnValue = uni.getStorageSync('statusColumnValue');
						if(statusColumnName!='') {
							if(!obj) {
								obj = uni.getStorageSync('crossObj');
							}
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = uni.getStorageSync('crossTable');
								await this.$api.update(`${table}`, obj);
							} else {
									crossuserid=Number(uni.getStorageSync('appUserid'));
									crossrefid=obj['id'];
									crossoptnum=uni.getStorageSync('statusColumnName');
									crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
						if(crossrefid && crossuserid) {
							this.ruleForm.crossuserid=crossuserid;
							this.ruleForm.crossrefid=crossrefid;
							let params = {
								page: 1,
								limit:10,
								crossuserid:crossuserid,
								crossrefid:crossrefid,
							}
							let res = await this.$api.list(`yuyuezixun`, params);
							if (res.data.total >= crossoptnum) {
								this.$utils.msg(uni.getStorageSync('tips'));
								uni.removeStorageSync('crossCleanType');
								this.submitting = false;
								return false;
							}
						}
						//跨表计算
					}
					let oet = {}
					if(this.ruleForm.id){
						await this.$api.update(`yuyuezixun`, this.ruleForm);
					}else{
						oet = await this.$api.add(`yuyuezixun`, this.ruleForm);
					}
					if(this.cross){
						uni.setStorageSync('crossCleanType',true);
					}
					uni.showToast({
						title: '预约提交成功',
						icon: 'success',
						duration: 1200
					});
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/yuyuezixun/list',
							fail() {
								that.$utils.jump('../yuyuezixun/list')
							}
						});
					}, 1200);
				} catch(e) {
					this.submitting = false;
					this.$utils.msg('提交失败，请稍后重试');
				}
			},
			optionsChange(e) {
				this.index = e.target.value
			},
			bindDateChange(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toggleTab(str) {
				if(this.ro[str]){
					return false
				}
				this.$refs[str].show();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
		background: #f6f8fb;
	}
	.appointment-flow {
		padding: 24rpx 20rpx;
		margin: 0 0 24rpx;
		border-radius: 18rpx;
		background: #fff;
		box-shadow: 0 10rpx 28rpx rgba(61, 66, 82, .08);
		display: flex;
		align-items: center;
	}
	.flow-step {
		width: 132rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}
	.flow-dot {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background: #eef0f6;
		color: #667085;
		font-size: 24rpx;
		line-height: 48rpx;
		text-align: center;
	}
	.flow-text {
		margin-top: 10rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 32rpx;
	}
	.flow-step.done .flow-dot,
	.flow-step.active .flow-dot {
		background: #0e9488;
		color: #fff;
	}
	.flow-step.done .flow-text,
	.flow-step.active .flow-text {
		color: #263238;
		font-weight: 600;
	}
	.flow-line {
		height: 2rpx;
		background: #e4e7ef;
		flex: 1;
		margin: 0 4rpx 38rpx;
	}
	.flow-line.active {
		background: #0e9488;
	}
	.appointment-summary {
		padding: 24rpx;
		margin: 0 0 24rpx;
		border-radius: 18rpx;
		background: #fbfcff;
		border: 2rpx solid #eef0f6;
	}
	.summary-title {
		color: #263238;
		font-size: 30rpx;
		font-weight: 600;
		line-height: 40rpx;
	}
	.summary-main {
		margin-top: 18rpx;
		display: flex;
		align-items: center;
	}
	.summary-avatar {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}
	.summary-avatar.placeholder {
		background: #e8f7f6;
		color: #0a756b;
		font-size: 34rpx;
		font-weight: 600;
		line-height: 96rpx;
		text-align: center;
	}
	.summary-copy {
		padding-left: 20rpx;
		min-width: 0;
		flex: 1;
	}
	.summary-name {
		color: #263238;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 42rpx;
	}
	.summary-meta {
		margin-top: 8rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 34rpx;
	}
</style>
