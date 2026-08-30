  <template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
		<view class="content">
			<view :style='{"minHeight":"100%","alignContent":"flex-start","padding":"120rpx 24rpx 240rpx 24rpx","alignItems":"flex-start","flexWrap":"wrap","background":"#ffffff","display":"block","width":"100%","position":"relative","height":"auto"}'>
				<view class="cu-bar bg-white search" :style='{"padding":"20rpx 0 0 0","margin":"0","background":"none","display":"flex","width":"100%","position":"relative","height":"auto"}'>
					<view  :style='{"border":"none","margin":"0","borderRadius":"20rpx","flex":"1","background":"none","lineHeight":"80rpx","position":"relative","height":"80rpx"}' class="search-form round">
						<text class="icon iconfont icon-fangdajing07" :style='{"color":"rgb(153, 153, 153)","left":"0px","textAlign":"center","width":"80rpx","fontSize":"40rpx","lineHeight":"80rpx","position":"absolute","right":"0px"}'></text>
						<input  :style='{"border":"0","padding":"12rpx 20rpx 12rpx 80rpx","color":"#0e9488","borderRadius":"40rpx","background":"#0e948820","width":"100%","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' v-model="searchForm.zixunmingcheng" type="text" placeholder="咨询名称" ></input>
					</view>
					<button :style='{"border":"0","padding":"0px","margin":"0 0 0 10rpx","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"136rpx","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx","zIndex":"99"}' @tap="search" class="cu-btn shadow-blur round">搜索</button>
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
							<view class="uni-product-title" :style='{"padding":"0","overflow":"hidden","color":"#333","maxHeight":"96rpx","width":"100%","lineHeight":"48rpx","fontSize":"28rpx"}'>{{product.zixunmingcheng}}</view>
							<view class="uni-product-title" :style='{"padding":"0","overflow":"hidden","color":"#333","maxHeight":"96rpx","width":"100%","lineHeight":"48rpx","fontSize":"28rpx"}'>{{product.zixunleixing}}</view>
							<image :style='{"border":"20rpx solid #0a756b20","padding":"0","margin":"0 0 4rpx 0","objectFit":"cover","borderRadius":"20rpx","display":"block","width":"100%","height":"300rpx","order":"-1"}' mode="aspectFill" class="uni-product-image" v-if="preHttp(product.zixunfengmian)" :src="product.zixunfengmian.split(',')[0]"></image>
							<image :style='{"border":"20rpx solid #0a756b20","padding":"0","margin":"0 0 4rpx 0","objectFit":"cover","borderRadius":"20rpx","display":"block","width":"100%","height":"300rpx","order":"-1"}' mode="aspectFill" class="uni-product-image" v-else :src="product.zixunfengmian?baseUrl+product.zixunfengmian.split(',')[0]:''"></image>

							<view :style='{"border":"none","padding":"0 10rpx 0 0","textAlign":"center","order":"9"}'>
								<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
								<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.split(' ')[0].replace(/\-/g,'-')}}</text>
							</view>
							<view :style='{"padding":"0 10rpx 0 0","order":"3"}'>
								<text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
								<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.yonghuzhanghao}}</text>
							</view>
							<!-- #ifdef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('yuyuezixun','修改')) || (!userid && isAuthFront('yuyuezixun','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#42a5f9","display":"inline-block"}' class="cuIcon-edit"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#42a5f9","display":"inline-block"}'>修改</text>
								</view>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('yuyuezixun','删除')) || (!userid && isAuthFront('yuyuezixun','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('yuyuezixun','修改')) || (!userid && isAuthFront('yuyuezixun','修改'))" @tap.stop.proevent="onUpdateTap(product)">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#42a5f9","display":"inline-block"}' class="cuIcon-edit"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#42a5f9","display":"inline-block"}'>修改</text>
								</view>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' v-if="(userid && isAuth('yuyuezixun','删除')) || (!userid && isAuthFront('yuyuezixun','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
						</view>
					</view>
			
			
			


			
			
			
			
				</view>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","margin":"20rpx 0 0 0","color":"#fff","bottom":"0","outline":"none","borderRadius":"20rpx","left":"0","background":"#4eb3a6","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' class="add-btn" @click="screenBoxShow=true">筛</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="userid && isAuth('yuyuezixun','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="!userid && isAuthFront('yuyuezixun','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<view :style='{"top":"0","left":"0","background":"rgba(0, 0, 0, .3)","width":"100%","position":"absolute","height":"100%","zIndex":"665"}' v-if="screenBoxShow" @click="screenBoxShow=false"></view>
				<view class="screenBox" :class="screenBoxShow?'screenBoxActive':''">
					<view  :style='{"width":"100%","padding":"20rpx 0 20rpx 0","alignItems":"center","justifyContent":"space-around","display":"flex"}'>
						<view :style='{"width":"18%","padding":"0 0 0 20rpx","fontSize":"24rpx"}'>咨询类型</view>
						<input :style='{"border":"2rpx solid rgb(162, 144, 104)","width":"80%","padding":"0 20rpx 0 20rpx","borderRadius":"40rpx","background":"none","height":"60rpx"}' placeholder="请输入咨询类型" v-model="searchForm.zixunleixing">
					</view>
					<view  :style='{"width":"100%","padding":"20rpx 0 20rpx 0","alignItems":"center","justifyContent":"space-around","display":"flex"}'>
						<view :style='{"width":"18%","padding":"0 0 0 20rpx","fontSize":"24rpx"}'>咨询封面</view>
						<input :style='{"border":"2rpx solid rgb(162, 144, 104)","width":"80%","padding":"0 20rpx 0 20rpx","borderRadius":"40rpx","background":"none","height":"60rpx"}' placeholder="请输入咨询封面" v-model="searchForm.zixunfengmian">
					</view>
					<view :style='{"width":"100%","padding":"40rpx 0 0","alignItems":"center","justifyContent":"space-around","display":"flex"}'>
						<div :style='{"width":"30%","lineHeight":"60rpx","color":"#888","textAlign":"center","background":"#EDEDED","height":"60rpx"}' @click="screenReset">重置</div>
						<div :style='{"width":"30%","lineHeight":"60rpx","color":"#fff","textAlign":"center","background":"#0e9488","height":"60rpx"}' @click="search">搜索</div>
					</view>
				</view>
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
					zixunmingcheng: '',
					zixunleixing: '',
					zixunfengmian: '',
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

				if(this.searchForm.zixunmingcheng){
					params['zixunmingcheng'] = '%' + this.searchForm.zixunmingcheng + '%'
				}
				if(this.searchForm.zixunleixing){
					params['zixunleixing'] = '%' + this.searchForm.zixunleixing + '%'
				}
				if(this.searchForm.zixunfengmian){
					params['zixunfengmian'] = '%' + this.searchForm.zixunfengmian + '%'
				}
                let res = {}
                res = await this.$api.page(`yuyuezixun`, params);

				// 如果是第一页数据置空
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
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
				if(row.sfsh=='是'||row.sfsh=='否'){
					this.$utils.msg('已审核完成,不能修改');
					return false
				}
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
							await that.$api.del('yuyuezixun', JSON.stringify([id]));
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

				if(this.searchForm.zixunmingcheng){
					searchForm['zixunmingcheng'] = '%' + this.searchForm.zixunmingcheng + '%'
				}
				if(this.searchForm.zixunleixing){
					searchForm['zixunleixing'] = '%' + this.searchForm.zixunleixing + '%'
				}
				if(this.searchForm.zixunfengmian){
					searchForm['zixunfengmian'] = '%' + this.searchForm.zixunfengmian + '%'
				}
				let res = {};
				res = await this.$api.page(`yuyuezixun`, searchForm);
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				
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
	.screenBox {
		padding: 20rpx 0 20rpx 0;
		transform: translate3d(100%, 0, 0);
		z-index: 666;
		top: 0;
		background: #FFFFFF;
		width: 80%;
		position: absolute;
		right: 0;
		transition: transform .3s;
		height: 100%;
		.screenTab {
			border: 2rpx solid rgb(162, 144, 104);
			border-radius: 40rpx;
			margin: 10rpx 0 10rpx 0;
			background: none;
			width: calc(100% / 3 - 24rpx);
			line-height: 72rpx;
			text-align: center;
		}
		.screenTabActive {
			border-radius: 40rpx;
			margin: 10rpx 0 10rpx 0;
			color: #fff;
			background: #0e9488;
			width: calc(100% / 3 - 20rpx);
			line-height: 72rpx;
			text-align: center;
		}
	}
	.screenBoxActive {
		transform: translate3d(0, 0, 0);
	}
</style>
