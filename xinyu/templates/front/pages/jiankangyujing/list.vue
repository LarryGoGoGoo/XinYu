  <template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
		<view class="content">
			<view :style='{"minHeight":"100%","alignContent":"flex-start","padding":"120rpx 24rpx 240rpx 24rpx","alignItems":"flex-start","flexWrap":"wrap","background":"#ffffff","display":"block","width":"100%","position":"relative","height":"auto"}'>
				<view class="cu-bar bg-white search" :style='{"padding":"20rpx 0 0 0","margin":"0","background":"none","display":"flex","width":"100%","position":"relative","height":"auto"}'>
				</view>
			

				<view :style='{"padding":"20rpx 0","margin":"20rpx 0 20rpx 0","borderRadius":"0","flexWrap":"wrap","background":"none","display":"flex","justifyContent":"center"}'>
					<view @click="sortClick('addtime')" :style='{"border":"0","padding":"0 12rpx 0 12rpx","margin":"0 20rpx 20rpx 0","outline":"0","borderRadius":"8rpx","display":"flex"}'>
						<text :style='{"color":"#333","lineHeight":"48rpx","fontSize":"24rpx"}'>按日期</text>
						<text v-if="listSort!='addtime'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
						<text v-else-if="listSort=='addtime'&&listOrder=='asc'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
						<text v-else-if="listSort=='addtime'&&listOrder=='desc'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
					</view>
				</view>
				<view :style='{"alignContent":"flex-start","alignItems":"flex-start","flexWrap":"wrap","background":"#ffffff","display":"flex","width":"100%","position":"initial","height":"auto","order":"4"}'>
					<!-- 样式1 -->
					<view class="uni-product-list" :style='{"padding":"0","margin":"0px 0 0 0","flexWrap":"wrap","flex":"auto","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
						<view @tap="onDetailTap(product)" class="uni-product" :style='{"border":"2rpx solid #0e948830","boxShadow":"none","padding":"16rpx","margin":"0 0 30rpx 0","overflow":"hidden","borderRadius":"20rpx","flexWrap":"wrap","background":"#fff","display":"flex","width":"48%","height":"auto"}' v-for="(product,index) in list" :key="index">
							<view class="uni-product-title" :style='{"padding":"0","overflow":"hidden","color":"#333","maxHeight":"96rpx","width":"100%","lineHeight":"48rpx","fontSize":"28rpx"}'>{{product.yonghuxingming}}</view>
							<view class="uni-product-title" :style='{"padding":"0","overflow":"hidden","color":"#333","maxHeight":"96rpx","width":"100%","lineHeight":"48rpx","fontSize":"28rpx"}'>{{product.yujingshijian}}</view>

							<view :style='{"padding":"12rpx 0 4rpx 0","width":"100%","display":"flex","alignItems":"center"}'>
								<text class="risk-pill" :class="product._riskClass">{{riskLabel(product.yujingtixing) || '未分级'}}</text>
							</view>
							<view class="uni-product-title warn-text" :style='{"padding":"0","overflow":"hidden","color":"#666","maxHeight":"72rpx","width":"100%","lineHeight":"36rpx","fontSize":"24rpx"}'>预警：{{plainText(product.yujingtixing)}}</view>

							<view :style='{"border":"none","padding":"0 10rpx 0 0","textAlign":"center","order":"9"}'>
								<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
								<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.split(' ')[0].replace(/\-/g,'-')}}</text>
							</view>
							<!-- #ifdef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('jiankangyujing','修改')) || (!userid && isAuthFront('jiankangyujing','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#42a5f9","display":"inline-block"}' class="cuIcon-edit"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#42a5f9","display":"inline-block"}'>修改</text>
								</view>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('jiankangyujing','删除')) || (!userid && isAuthFront('jiankangyujing','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('jiankangyujing','修改')) || (!userid && isAuthFront('jiankangyujing','修改'))" @tap.stop.proevent="onUpdateTap(product)">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#42a5f9","display":"inline-block"}' class="cuIcon-edit"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#42a5f9","display":"inline-block"}'>修改</text>
								</view>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('jiankangyujing','删除')) || (!userid && isAuthFront('jiankangyujing','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
						</view>
					</view>
			
			
			


			
			
			
			
				</view>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="userid && isAuth('jiankangyujing','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="!userid && isAuthFront('jiankangyujing','新增')" class="add-btn" @click="onAddTap()">新增</button>
			</view>
		</view>
		<!-- <view v-if="scrollTop>200" @tap="scrollTopClick" :style='{"boxShadow":"0 8rpx 16rpx rgba(0,0,0,.3)","borderRadius":"50%","textAlign":"center","bottom":"20%","background":"#ff000030","width":"60rpx","lineHeight":"60rpx","position":"fixed","right":"20rpx","height":"60rpx","zIndex":"999"}'>
			<span class="icon iconfont icon-jiantou07" :style='{"color":"#fff"}'></span>
		</view> -->
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				btnColor: ['#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#e6a23c','#909399','#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#909399'],
				list: [],
				lists: [],
                userid: '',
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
					onScroll: true,
					toTop: true
				},
				hasNext: true,
				searchForm:{
				},
				CustomBar: '0',
				listSort: 'id',
				listOrder: 'desc',
				screenBoxShow: false,
				scrollTop: 0,
			};
		},
		watch: {
		},
		mounted() {
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
			username() {
				return uni.getStorageSync("nickname")
			},
			role() {
				return uni.getStorageSync("appRole")
			},
		},
		onUnload() {
			uni.removeStorageSync("useridTag");
		},
		async onShow() {
			if(uni.getStorageSync("useridTag")==1){
				this.userid=uni.getStorageSync("useridTag");
				let remindRes = null
			} else {
				this.userid = "";
			}
			this.btnColor = this.btnColor.sort(()=> {
				return (0.5-Math.random());
			});
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
			this.$forceUpdate()
		},
		async onLoad(options) {
			this.hasNext = true
			// 重新加载数据
			// if (this.mescroll) this.mescroll.resetUpScroll()
		},
		components: {
		},
		methods: {
			// 从预警提醒文案中解析风险等级标签
			riskLabel(text) {
				if (!text) return '';
				const m = String(text).match(/【(低风险|中风险|高风险|危机)】/);
				return m ? m[1] : '';
			},
			// 供 :class 绑定使用（小程序模板不支持 :style 方法调用）
			riskClass(text) {
				const map = {
					'低风险': 'risk-low',
					'中风险': 'risk-mid',
					'高风险': 'risk-high',
					'危机': 'risk-crisis',
				};
				return map[this.riskLabel(text)] || 'risk-none';
			},
			// 批量预计算列表项的风险 class（小程序 :class 不支持方法调用，需提前挂到数据对象）
			decorateRiskClass(list) {
				list.forEach(item => {
					this.$set(item, '_riskClass', this.riskClass(item.yujingtixing));
				});
			},
			// 去掉【】标记与内部 DIARYWARN 去重标记的纯文案预览
			plainText(text) {
				if (!text) return '';
				return String(text)
					.replace(/【[^】]*】/g, '')
					.replace(/DIARYWARN:[a-f0-9]{12}/gi, '')
					.replace(/\s+/g, ' ')
					.trim()
					.slice(0, 36);
			},
			queryChange(arr){
				for(let x in arr) {
					if(arr[x] == this.role) {
						return true
					}
				}
				return false
			},
			scrollChange(e){
				this.scrollTop = e.scrollTop
			},
			scrollTopClick(){
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			screenReset(){
				this.searchForm = {}
				this.search()
				this.$forceUpdate()
			},
			uGetRect(selector, all) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
					.in(this)
					[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect);
						}
						if (!all && rect) {
							resolve(rect);
						}
					})
					.exec();
				});
			},
			cloneData(data) {
				return JSON.parse(JSON.stringify(data));
			},
			sortClick(type){
				if(this.listSort==type){
					if(this.listOrder == 'desc'){
						this.listOrder = 'asc'
					}else{
						this.listOrder = 'desc'
					}
				}else{
					this.listSort = type
					this.listOrder = 'desc'
				}
				this.search()
			},
            priceChange(price) {
                return Number(price).toFixed(2);
            },
            preHttp(str) {
                return str && str.substr(0,4)=='http';
            },
			//类别搜索
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
				}
				params['sort'] = this.listSort;
				params['order'] = this.listOrder;

				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
                let res = {}
                if(this.userid) {
                    res = await this.$api.page(`jiankangyujing`, params);
                } else {
                    res = await this.$api.list(`jiankangyujing`, params);
                }

				// 如果是第一页数据置空
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				// 预计算风险标签 class（小程序 :class 不支持方法调用）
				this.decorateRiskClass(this.list);
				this.$forceUpdate()
				
				let length = Math.ceil(this.list.length/6)
				let arr = [];
				for (let i = 0; i<length; i++){
					arr[i] = this.list.slice(i*6, (i+1)*6)
				}
				this.lists = arr
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 详情
			onDetailTap(item) {
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./detail?id=${item.id}&userid=`+this.userid)
			},
			onUpdate(e){
				this.onUpdateTap(e.currentTarget.dataset.row)
			},
			// 修改
			onUpdateTap(row){
				uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./add-or-update?id=${row.id}`)
			},
			// 添加
			onAddTap(){
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./add-or-update`)
			},
			onDelete(e){
				this.onDeleteTap(e.currentTarget.dataset.row.id)
			},
			onDeleteTap(id){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							await that.$api.del('jiankangyujing', JSON.stringify([id]));
							that.$utils.msg('删除成功');
							that.hasNext = true
							// 重置分页参数页数为1
							that.search()
						}
					}
				});
			},
			// 搜索
			async search(){
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size,
				}
				searchForm['sort'] = this.listSort;
				searchForm['order'] = this.listOrder;

				let res = {};
				if(this.userid) {
					res = await this.$api.page(`jiankangyujing`, searchForm);
				} else {
					res = await this.$api.list(`jiankangyujing`, searchForm);
				}
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				// 预计算风险标签 class（小程序 :class 不支持方法调用）
				this.decorateRiskClass(this.list);
				
				let length = Math.ceil(this.list.length/6)
				let arr = [];
				for (let i = 0; i<length; i++){
					arr[i] = this.list.slice(i*6, (i+1)*6)
				}
				this.lists = arr
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
				this.screenBoxShow = false
			},
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
	}
	.category-one .tab {
		cursor: pointer;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin: 0 12rpx 12rpx 0;
		color: #000;
		background: #fff;
		display: inline-block;
		width: auto;
		font-size: 28rpx;
		line-height: 60rpx;
		height: 60rpx;
	}
	
	.category-one .tab.active {
		cursor: pointer;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin: 0 12rpx 0 0;
		color: #fff;
		background: #0e9488;
		display: inline-block;
		width: auto;
		font-size: 28rpx;
		line-height: 60rpx;
		height: 60rpx;
	}

	/* 风险等级标签 */
	.risk-pill {
		display: inline-block;
		padding: 4rpx 18rpx;
		border-radius: 999rpx;
		font-size: 22rpx;
		line-height: 1.6;
	}
	.risk-low { color: #2E9E6B; background: rgba(46,158,107,0.12); }
	.risk-mid { color: #D98A00; background: rgba(217,138,0,0.12); }
	.risk-high { color: #E2574C; background: rgba(226,87,76,0.12); }
	.risk-crisis { color: #FFFFFF; background: #C9302C; }
	.risk-none { color: #8A9893; background: #F0F5F3; }

	.warn-text {
		word-break: break-all;
	}
</style>
