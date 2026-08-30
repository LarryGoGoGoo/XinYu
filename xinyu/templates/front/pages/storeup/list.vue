  <template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @scroll="scrollChange">
		<view class="content">
			<view :style='{"minHeight":"100%","alignContent":"flex-start","padding":"120rpx 24rpx 240rpx 24rpx","alignItems":"flex-start","flexWrap":"wrap","background":"#ffffff","display":"block","width":"100%","position":"relative","height":"auto"}'>
				<view class="cu-bar bg-white search" :style='{"padding":"20rpx 0 0 0","margin":"0","background":"none","display":"flex","width":"100%","position":"relative","height":"auto"}'>
				</view>
			

				<view :style='{"alignContent":"flex-start","alignItems":"flex-start","flexWrap":"wrap","background":"#ffffff","display":"flex","width":"100%","position":"initial","height":"auto","order":"4"}'>
					<view class="uni-product-list" :style='{"padding":"0","margin":"0px 0 0 0","flexWrap":"wrap","flex":"auto","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}' v-if="type!=81">
						<view @tap="onDetailTap(product)" class="uni-product" :style='{"border":"2rpx solid #0e948830","boxShadow":"none","padding":"16rpx","margin":"0 0 30rpx 0","overflow":"hidden","borderRadius":"20rpx","flexWrap":"wrap","background":"#fff","display":"flex","width":"48%","height":"auto"}' v-for="(product,index) in list" :key="index">
							<view class="uni-product-title " :style='{"padding":"0","overflow":"hidden","color":"#333","maxHeight":"96rpx","width":"100%","lineHeight":"48rpx","fontSize":"28rpx"}'>{{product.name}}</view>
							<image :style='{"border":"20rpx solid #0a756b20","padding":"0","margin":"0 0 4rpx 0","objectFit":"cover","borderRadius":"20rpx","display":"block","width":"100%","height":"300rpx","order":"-1"}' mode="aspectFill" class="uni-product-image" v-if="product.tablename.substr(0,7)=='chapter'" src="/static/chapter.jpg"></image>
							<image :style='{"border":"20rpx solid #0a756b20","padding":"0","margin":"0 0 4rpx 0","objectFit":"cover","borderRadius":"20rpx","display":"block","width":"100%","height":"300rpx","order":"-1"}' mode="aspectFill" class="uni-product-image" v-else-if="preHttp(product.picture)" :src="product.picture"></image>
							<image :style='{"border":"20rpx solid #0a756b20","padding":"0","margin":"0 0 4rpx 0","objectFit":"cover","borderRadius":"20rpx","display":"block","width":"100%","height":"300rpx","order":"-1"}' mode="aspectFill" class="uni-product-image" v-else :src="baseUrl+product.picture"></image>
							<!-- #ifdef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' @tap.stop.proevent="onDelete" :data-row="product">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<view :style='{"width":"100%","padding":"0","justifyContent":"space-between","display":"flex","height":"auto","order":"11"}'>
								<view :style='{"padding":"8rpx 12rpx","background":"none","justifyContent":"center","display":"flex"}' @tap.stop.proevent="onDeleteTap(product)">
									<text :style='{"margin":"0 8rpx 0 0","fontSize":"24rpx","lineHeight":"1","color":"#ff0000","display":"inline-block"}' class="cuIcon-delete"></text>
									<text :style='{"fontSize":"24rpx","lineHeight":"1","whiteSpace":"nowrap","color":"#ff0000","display":"inline-block"}'>删除</text>
								</view>
							</view>
							<!-- #endif -->
						</view>
					</view>
					<zb-table :show-header="true" :columns="column" :stripe="true" v-else
						@rowClick="onUpdateOrDel" :data="list" :formatter="formatter"></zb-table>

			
			
			
			
				</view>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="userid && isAuth('storeup','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #dddddd","padding":"0 30rpx","margin":"0 10rpx 0 0","color":"#fff","bottom":"0","right":"0","outline":"none","borderRadius":"20rpx","background":"#4eb3a6","width":"auto","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1"}' v-if="!userid && isAuthFront('storeup','新增')" class="add-btn" @click="onAddTap()">新增</button>
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
				clicknumColor: ['#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#e6a23c','#909399','#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#909399'],
				list: [],
				lists: [],
                userid: '',
                type: 1,
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
				column: [
					{
						name: 'content',
						label: '评论内容',
						fixed: false,
						formatter:true
					},
					{
						name: 'reply',
						label: '回复内容',
						sorter: false,
						align: 'right',
						formatter:true
					},
					{
						name: 'name',
						label: '目标表',
						align: 'right',
					},
				],
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
			this.clicknumColor = this.clicknumColor.sort(()=> {
				return (0.5-Math.random());
			});
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
			this.$forceUpdate()
		},
		async onLoad(options) {
			if(options.menuJump) {
				this.type=options.menuJump;
			} else {
				this.type = '1';
			}
			if(options.menuJump==1) {
				uni.setNavigationBarTitle({
					title: '我的收藏'
				})
			}else if(options.menuJump==21) {
				uni.setNavigationBarTitle({
					title: '我的点赞'
				})
			}else if(options.menuJump==31) {
				uni.setNavigationBarTitle({
					title: '我的参拍'
				})
			}else if(options.menuJump==41) {
				uni.setNavigationBarTitle({
					title: '我的关注'
				})
			}else if(options.menuJump==51) {
				uni.setNavigationBarTitle({
					title: '浏览历史'
				})
			}else if(options.menuJump==81) {
				uni.setNavigationBarTitle({
					title: '我的评论'
				})
			}
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
				let that = this
				if(this.type==81) {
					let res = await this.$api.list(`comment`);
					res.data = res.data.map(item=>{
						item.name = changeInCommon(item.tablename)
						return item
					})
					this.list = res.data
					this.hasNext = false;
					return false
					function changeInCommon(name){
						let arr = that.$config.list()
						for(let x in arr) {
							if(arr[x].value == name) {
								return arr[x].name
							}
						}
					}
				}
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
				}
				params['sort'] = this.listSort;
				params['order'] = this.listOrder;

				params['type']=this.type;
				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
                let res = {}
                if(this.userid) {
                    res = await this.$api.page(`storeup`, params);
                } else {
                    res = await this.$api.list(`storeup`, params);
                }

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
			onUpdateOrDel(row){
				// #ifdef MP-WEIXIN
				row = row.$orig || row
				// #endif
				let that = this
				uni.showActionSheet({
					itemList: ['查看','删除'],
					success(res) {
						if(res.tapIndex==0){
							that.onUpdateTap(row)
						}else if(res.tapIndex==1){
							that.onDeleteTap(row)
						}
					}
				})
			},
			// 详情
			onDetailTap(item) {
				if(item.tablename =='news'){
					this.$utils.jump(`../news-detail/news-detail?id=${item.refid}`)
					return false
				}
				if(item.tablename =='forum'){
					this.$utils.jump(`../forum-detail/forum-detail?id=${item.refid}`)
					return false
				}
				if(item.tablename.substr(0,7)=='chapter'){
					let tablename = item.tablename.substr(7,item.tablename.length)
					this.$utils.jump(`../${tablename}/chapter?id=${item.refid}&refid=${item.remark}`)
					return false
				}
				this.$utils.jump(`../${item.tablename}/detail?id=${item.refid}`)
			},
			// 查看
			onUpdateTap(row){
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`../${row.tablename}/detail?id=${row.refid}`)
			},
			formatter(row, column, rowIndex, columnIndex){
				let text = ''
				if(columnIndex==0) {
					text = row.content?row.content:''
				}else{
					text = row.reply?row.reply:''
				}
				return text.replace(/<[^>]*>/g, '')
			},
			// 添加
			onAddTap(){
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./add-or-update`)
			},
			onDelete(e){
				this.onDeleteTap(e.currentTarget.dataset.row)
			},
			onDeleteTap(row){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							if(that.type==81){
								await that.$api.del(`discuss${row.tablename}`, JSON.stringify([row.id]));
								let rs = await that.$api.info(`${row.tablename}`,row.refid)
								rs.data.discussnum--
								await that.$api.update(`${row.tablename}`,rs.data)
								that.hasNext = true
								// 重置分页参数页数为1
								that.search()
								return false
							}
							if(that.type==1) {
								let rs = await that.$api.info(`${row.tablename}`,row.refid)
								rs.data.storeupnum--
								await that.$api.update(`${row.tablename}`,rs.data)
							}
							if(that.type==21) {
								let rs = await that.$api.info(`${row.tablename}`,row.refid)
								rs.data.thumbsupnum--
								await that.$api.update(`${row.tablename}`,rs.data)
							}
							await that.$api.del('storeup', JSON.stringify([row.id]));
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
				if(this.type==81) {
					let res = await this.$api.list(`comment`);
					this.list = res.data
					this.hasNext = false;
					return false
				}
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size,
				}
				searchForm['sort'] = this.listSort;
				searchForm['order'] = this.listOrder;

				searchForm['type']=this.type;
				let res = {};
				if(this.userid) {
					res = await this.$api.page(`storeup`, searchForm);
				} else {
					res = await this.$api.list(`storeup`, searchForm);
				}
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
</style>
