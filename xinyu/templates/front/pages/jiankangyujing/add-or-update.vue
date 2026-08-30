  

<template>
<view class="content">
	<view :style='{"minHeight":"100%","width":"100%","padding":"0 24rpx 0 24rpx","position":"relative","background":"#fff","height":"auto"}' v-if="showType==1">
		<form :style='{"width":"100%","padding":"24rpx","background":"none","display":"block","height":"auto"}' class="app-update-pv">










			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class=" select">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">用户账号</view>
				<picker :disabled="ro.yonghuzhanghao" :style='{"width":"100%","flex":"1","height":"auto"}' @change="yonghuzhanghaoChange" :value="yonghuzhanghaoIndex" :range="yonghuzhanghaoOptions">
					<view :style='{"width":"100%","lineHeight":"80rpx","fontSize":"28rpx","color":"#4eb3a6"}' class="uni-input">{{yonghuzhanghaoOptions[yonghuzhanghaoIndex]}}</view>
				</picker>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">用户姓名</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' disabled v-model.number="ruleForm.yonghuxingming" placeholder="用户姓名"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">预警提醒</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.yujingtixing" v-model="ruleForm.yujingtixing" placeholder="预警提醒"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">心理建议</view>
				<input :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' :disabled="ro.xinlijianyi" v-model="ruleForm.xinlijianyi" placeholder="心理建议"  type="text"></input>
			</view>
			<view :style='{"padding":"12rpx 0","margin":"0 0 24rpx 0","borderColor":"#e5f4f1","alignItems":"center","borderWidth":"0 0 2rpx 0","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' class="">
				<view :style='{"padding":"0 20rpx 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"right","width":"auto","lineHeight":"80rpx","fontSize":"28rpx"}' class="title">预警时间</view>
				<input :disabled="ro.yujingshijian" :style='{"border":"0","padding":"0 24rpx 0 24rpx","margin":"0","color":"#666","borderRadius":"8rpx","flex":"1","background":"none","fontSize":"28rpx","height":"80rpx"}' v-model="ruleForm.yujingshijian" placeholder="预警时间" @tap="toggleTab('yujingshijian')"></input>
			</view>
     
			
			<view :style='{"padding":"0","margin":"40rpx 0 0 0","flexWrap":"wrap","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}' class="btn" >
				<button :style='{"border":"0","padding":"0px","margin":"0 0 24rpx 0","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"100%","lineHeight":"80rpx","fontSize":"32rpx","fontWeight":"600","height":"80rpx"}' @tap="onSubmitTap(null)" class="bg-red">提交</button>
			</view>
		</form>
		<w-picker  mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="yujingshijianConfirm" ref="yujingshijian" themeColor="#333333"></w-picker>
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
				yonghuzhanghao: '',
				yonghuxingming: '',
				yujingtixing: '',
				xinlijianyi: '',
				yujingshijian: '',
				},
				yonghuzhanghaoOptions: [],
				yonghuzhanghaoIndex: 0,
				// 登录用户信息
				user: {},
				ro:{
				   yonghuzhanghao : false,
				   yonghuxingming : false,
				   yujingtixing : false,
				   xinlijianyi : false,
				   yujingshijian : false,
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
			this.ruleForm.yujingshijian =  this.$utils.getCurDateTime();
			let table = uni.getStorageSync("nowTable");
			// 获取用户信息
			let res = await this.$api.session(table);
			this.user = res.data;
			
			// ss读取

			this.ro.yujingshijian = true;
			// 跨表
			this.cross = options.cross;
			if(options.cross){
				var obj = uni.getStorageSync('crossObj');
				for (var o in obj){
					if(o=='yonghuzhanghao'){
						this.ruleForm.yonghuzhanghao = obj[o];
						for(let x in this.yonghuzhanghaoOptions) {
							if(this.yonghuzhanghaoOptions[x] == this.ruleForm.yonghuzhanghao) {
								this.yonghuzhanghaoIndex = Number(x)
							}
						}
						this.ro.yonghuzhanghao = true;
						continue;
					}
					if(o=='yonghuxingming'){
						this.ruleForm.yonghuxingming = obj[o];
						this.ro.yonghuxingming = true;
						continue;
					}
					if(o=='yujingtixing'){
						this.ruleForm.yujingtixing = obj[o];
						this.ro.yujingtixing = true;
						continue;
					}
					if(o=='xinlijianyi'){
						this.ruleForm.xinlijianyi = obj[o];
						this.ro.xinlijianyi = true;
						continue;
					}
					if(o=='yujingshijian'){
						this.ruleForm.yujingshijian = obj[o];
						this.ro.yujingshijian = true;
						continue;
					}
				}
			}

			// 下2
			var yonghuzhanghaoRefParams = {}
			res = await this.$api.option(`yonghu`,`yonghuzhanghao`,yonghuzhanghaoRefParams);
			this.yonghuzhanghaoOptions = res.data;
			this.yonghuzhanghaoOptions.unshift("请选择用户账号");
			if(this.ruleForm.yonghuzhanghao) {
				for(let x in this.yonghuzhanghaoOptions) {
					if(this.yonghuzhanghaoOptions[x] == this.ruleForm.yonghuzhanghao) {
						this.yonghuzhanghaoIndex = Number(x)
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
				res = await this.$api.info(`jiankangyujing`, this.ruleForm.id);
				if(res.data.yonghuzhanghao) {
					for(let x in this.yonghuzhanghaoOptions) {
						if(this.yonghuzhanghaoOptions[x] == res.data.yonghuzhanghao) {
							this.yonghuzhanghaoIndex = Number(x)
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
			// 下二随
			async yonghuzhanghaoChange (e) {
				this.yonghuzhanghaoIndex = e.target.value
				this.ruleForm.yonghuzhanghao = this.yonghuzhanghaoOptions[this.yonghuzhanghaoIndex]
				if(this.yonghuzhanghaoIndex==0) {
					this.ruleForm.yonghuxingming = ''
					return false
				}
				let res = await this.$api.follow(`yonghu`, `yonghuzhanghao`,{
					columnValue: this.ruleForm.yonghuzhanghao
				});
				if(res.data.yonghuxingming){
					this.ruleForm.yonghuxingming = res.data.yonghuxingming
				}
			},

			// 多级联动参数


			// 日长控件选择日期时间
			yujingshijianConfirm(val) {
				this.ruleForm.yujingshijian = val.result;
				this.$forceUpdate();
			},



			getUUID () {
				return new Date().getTime();
			},
			async onSubmitTap(subMitType=null) {
				let that = this
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
						let res = await this.$api.list(`jiankangyujing`, params);
						if (res.data.total >= crossoptnum) {
							this.$utils.msg(uni.getStorageSync('tips'));
							uni.removeStorageSync('crossCleanType');
							return false;
						}
					}
					//跨表计算
				}
				let oet = {}
				if(this.ruleForm.id){
					await this.$api.update(`jiankangyujing`, this.ruleForm);
				}else{
					oet = await this.$api.add(`jiankangyujing`, this.ruleForm);
				}
				if(this.cross){
					uni.setStorageSync('crossCleanType',true);
				}
				that.$utils.msgBack('提交成功');
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
	}
</style>
