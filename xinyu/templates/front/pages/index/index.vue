<template>
	<view class="content">
		<view :style='{"width":"100%","padding":"0 0 40rpx 0","background":"#fff","flexDirection":"column","display":"flex","height":"auto"}'>
			<!-- 品牌头部：logo + 名称 + slogan -->
			<view class="brand-header">
				<image v-if="indexLogoUrl" class="brand-logo" :src="baseUrl + indexLogoUrl" mode="aspectFit"></image>
				<view v-else class="brand-logo brand-logo-text">心</view>
				<view class="brand-copy">
					<view class="brand-name">心理驿站</view>
					<view class="brand-slogan">温暖陪伴 · 专业守护每一次心灵成长</view>
				</view>
			</view>

			<view class="list-swiper-4" :style='{"width":"100%","position":"relative","height":"360rpx"}' @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
				<view :style='{"width":"100%","position":"absolute","top":"0%","left":"0%","background":"#fff","height":"360rpx"}' class="item animate__animated" :class="prevNumList4 == index  ? 'animate__backOutRight' : (numList4 == index  ? 'animate__backInLeft' : '')" v-for="(swiper,index) in swiperList" :key="index" v-if="numList4 == index || prevNumList4 == index">
					<image :style='{"width":"100%","objectFit":"cover","display":"block","height":"360rpx"}' mode="aspectFill" :src="baseUrl+swiper.img" @tap="onSwiperTap(swiper)"></image>
					<view :style='{"padding":"8rpx 20rpx","margin":"-20rpx 0 0 0","transform":"translate3d(-50%, -50%, 0)","top":"50%","color":"#000","left":"50%","background":"rgba(255, 255, 255, 0.3)","display":"none","lineHeight":"1.5","fontSize":"40rpx","position":"absolute"}'>{{ swiper.title }}</view>
				</view>
				<view v-if="swiperList.length === 0" class="swiper-placeholder">
					<view class="swiper-placeholder-title">欢迎来到心理驿站</view>
					<view class="swiper-placeholder-sub">从一次自我探索开始，遇见更好的自己</view>
				</view>
				<view class="animate__navigation" :style='{"alignItems":"center","left":"0%","bottom":"0%","background":"rgba(0,0,0,.3)","display":"flex","width":"100%","position":"absolute","justifyContent":"center","height":"40rpx"}'>
					<block v-for="(swiper,index) in swiperList" :key="index">
						<text class="navigation-item" v-if="numList4 == index" :style='{"width":"28rpx","margin":"0 4rpx","borderRadius":"100%","background":"#0e9488","height":"10rpx"}'></text>
						<text class="navigation-item" v-if="numList4 != index" :style='{"width":"10rpx","margin":"0 4rpx","borderRadius":"100%","background":"rgba(255,255,255,.7)","height":"10rpx"}'></text>
					</block>
				</view>
			</view>
			<view class="cu-bar bg-white search" :style='{"width":"100%","padding":"20rpx 24rpx","position":"relative","background":"none","display":"flex","height":"auto"}'>
				<picker :style='{"width":"40rpx","lineHeight":"80rpx","position":"relative","alignItems":"center","justifyContent":"center","display":"flex"}' v-if="queryList.length>1" mode="selector" :range="queryList" range-key="queryName" :value="queryIndex" @change="queryChange">
					<text class="icon iconfont icon-jiantou18" :style='{"width":"40rpx","lineHeight":"80rpx","color":"#999","textAlign":"center"}'></text>
				</picker>
				<view :style='{"border":"none","margin":"0","position":"relative","borderRadius":"40rpx","flex":"1","background":"none"}' v-if="queryIndex==0" class="search-form round">
					<text class="icon iconfont icon-fangdajing07" :style='{"color":"rgb(153, 153, 153)","left":"0px","textAlign":"center","width":"80rpx","fontSize":"40rpx","lineHeight":"80rpx","position":"absolute","right":"0px"}'></text>
					<input placeholder-style="color: #999" :style='{"border":"0","padding":"12rpx 20rpx 12rpx 80rpx","color":"#263238","borderRadius":"40rpx","background":"#e5f4f1","width":"100%","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' v-model="searchForm.xinlizhishiwenzhangbiaoti" type="text" placeholder="文章标题" ></input>
				</view>
				<button :style='{"border":"0","padding":"0px","margin":"0 0 0 10rpx","color":"#fff","borderRadius":"40rpx","background":"linear-gradient(126deg, #4eb3a6 3%,#0e9488 97%)","width":"136rpx","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' v-if="queryIndex==0" @tap="onPageTap('xinlizhishi')" class="cu-btn shadow-blur round">搜索</button>
			</view>
			<view class="quick-entry-panel">
				<view class="quick-entry-main" @tap="goQuick('../exampaperlist/list')">
					<view class="quick-entry-icon test">测</view>
					<view class="quick-entry-copy">
						<view class="quick-entry-title">心理测试</view>
						<view class="quick-entry-desc">开始量表测评，查看专业分析</view>
					</view>
					<text class="icon iconfont icon-gengduo1 quick-entry-arrow"></text>
				</view>
				<view class="quick-entry-grid">
					<view class="quick-entry-item" @tap="goQuick('../xinyuai/index')">
						<view class="quick-entry-item-title">心语AI</view>
						<view class="quick-entry-item-desc">共情倾诉·危机预警</view>
					</view>
					<view class="quick-entry-item" @tap="goQuick('../doctor/index')">
						<view class="quick-entry-item-title">医生助手</view>
						<view class="quick-entry-item-desc">症状参考建议</view>
					</view>
				</view>
				<view class="quick-entry-grid">
					<view class="quick-entry-item" @tap="goQuick('../yuyuezixun/list')">
						<view class="quick-entry-item-title">我的预约</view>
						<view class="quick-entry-item-desc">查看审核进度</view>
					</view>
					<view class="quick-entry-item" @tap="goQuick('../xinliyisheng/list')">
						<view class="quick-entry-item-title">预约医生</view>
						<view class="quick-entry-item-desc">选择咨询师</view>
					</view>
				</view>
			</view>
			<!-- menu -->
			<view v-if="true" class="menu_view">
				<block v-for="(item,index1) in menuList" v-bind:key="item.roleName">
					<block v-if="index1==0" v-bind:key="index" v-for=" (menu,index) in item.frontMenu">
						<block v-bind:key="sort" v-for=" (child,sort) in menu.child">
							<block v-bind:key="sort2" v-for=" (button,sort2) in child.buttons">
								<view class="menu-item" v-if="button=='查看' && child.tableName!='yifahuodingdan' && child.tableName!='yituikuandingdan' &&child.tableName!='yiquxiaodingdan' && child.tableName!='weizhifudingdan' && child.tableName!='yizhifudingdan' && child.tableName!='yiwanchengdingdan' " @tap="onPageTap2(child.tableName)">
									<view class="iconarr" :class="child.appFrontIcon" :style="{'color':menuColor[index]}"></view>
									
									<view class="text">{{child.menu.split("列表")[0]}}</view>
								</view>
							</block>
						</block>
					</block>
				</block>
			</view>
			<!-- 商品推荐 -->
			<view class="listBox recommend" :style='{"padding":"0 20rpx","margin":"40rpx 0 0","background":"none","order":"1"}'>
				<view class="title" :style='{"padding":"0 20rpx 0 60rpx","margin":"0","background":"linear-gradient(135deg, #0a756b 0%, #0e9488 100%)","display":"flex","width":"100%","position":"relative","justifyContent":"space-between","height":"76rpx"}'>
					<view :style='{"color":"#fff","fontSize":"32rpx","lineHeight":"76rpx"}'>心理知识推荐</view>
					<view :style='{"margin":"0 20rpx 0 0","alignItems":"center","justifyContent":"center","display":"flex"}' @tap="onPageTap('xinlizhishi')">
						<text :style='{"color":"#fff","fontSize":"28rpx"}'>更多</text>
						<text class="icon iconfont icon-gengduo1" :style='{"color":"#fff","fontSize":"28rpx"}'></text>
					</view>
				</view>
				<!-- 样式1 -->
				<view class="list-box style1" :style='{"padding":"0","margin":"40rpx 0 0 0","flexWrap":"wrap","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
					<view @tap="onDetailTap('xinlizhishi',product.id)" v-for="(product,index) in xinlizhishilist" :key="index" class="list-item" :style='{"border":"2rpx solid #0e948830","padding":"4rpx","margin":"0 0 30rpx 0","borderRadius":"10rpx","flexWrap":"wrap","display":"flex","width":"32%","height":"auto"}'>
						<view :style='{"padding":"4rpx 20rpx","overflow":"hidden","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","textOverflow":"ellipsis"}' class="list-item-title ">{{product.wenzhangbiaoti}}</view>
						<image :style='{"padding":"0","margin":"0","objectFit":"cover","borderRadius":"8rpx","display":"block","width":"100%","height":"180rpx","order":"-1"}' class="list-item-image" mode="aspectFill" v-if="product.fengmiantupian.substring(0,4)=='http'" :src="product.fengmiantupian"></image>
						<image :style='{"padding":"0","margin":"0","objectFit":"cover","borderRadius":"8rpx","display":"block","width":"100%","height":"180rpx","order":"-1"}' class="list-item-image" mode="aspectFill" v-else :src="product.fengmiantupian?baseUrl+product.fengmiantupian.split(',')[0]:''"></image>
						<view :style='{"padding":"4rpx 20rpx","overflow":"hidden","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","textOverflow":"ellipsis"}' class="list-item-title ">{{product.zhishifenlei}}</view>
						<view :style='{"padding":"0 10rpx 0 0","order":"1"}'>
							<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#7E7E7E"}'></text>
							<text :style='{"color":"#7E7E7E","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.split(' ')[0].replace(/\-/g,'-')}}</text>
						</view>
						<view :style='{"padding":"0 10rpx 0 0"}'>
							<text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
							<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.yishenggonghao}}</text>
						</view>
						<view :style='{"padding":"0 10rpx 0 0"}'>
							<text class="icon iconfont icon-zan10" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
							<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.thumbsupnum}}</text>
						</view>
						<view :style='{"padding":"0 10rpx 0 0"}'>
							<text class="icon iconfont icon-shoucang10" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
							<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.storeupnum}}</text>
						</view>
						<view :style='{"padding":"0 10rpx 0 0"}'>
							<text class="icon iconfont icon-chakan9" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
							<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.clicknum}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品推荐 -->
			
			<!-- 商品列表 -->
			<!-- 商品列表 -->
			<!-- 新闻资讯 -->
			<view class="listBox news" :style='{"width":"100%","padding":"0 20rpx","margin":"40rpx 0 0","background":"none","order":"2"}'>
				<view class="title" :style='{"padding":"0 0 0 60rpx","margin":"0","background":"linear-gradient(135deg, #0a756b 0%, #0e9488 100%)","display":"flex","width":"100%","position":"relative","justifyContent":"start","height":"76rpx"}'>
					<view :style='{"color":"#fff","fontSize":"32rpx","lineHeight":"76rpx"}'>心灵资讯</view>
					<view :style='{"position":"absolute","right":"40rpx","alignItems":"center","top":"0","justifyContent":"center","display":"flex"}' @tap="onPageTap('news')">
					  <text :style='{"fontSize":"28rpx","lineHeight":"76rpx","color":"#fff","height":"76rpx"}'>更多</text>
					  <text class="icon iconfont icon-gengduo1" :style='{"color":"#fff","fontSize":"28rpx"}'></text>
					</view>
				</view>
				<!-- 样式7 -->
				<view class="news-box4" :style='{"width":"100%","padding":"0","margin":"40rpx 0 0","height":"auto"}'>
					<block v-for="(item,index) in news" :key="index">
						<view @tap="onNewsDetailTap(item.id)" v-if="index%2==0" class="list-item" :style='{"boxShadow":"0 2rpx 12rpx #dddddd","padding":"10rpx","margin":"0 0 30rpx 0","alignItems":"center","borderRadius":"10rpx","flexWrap":"wrap","background":"none","display":"flex","width":"100%","height":"auto"}'>
							<image :style='{"width":"30%","objectFit":"cover","borderRadius":"8rpx","display":"block","height":"200rpx"}' mode="aspectFill" class="listmpic" :src="baseUrl+item.picture"></image>
							<view class="list-item-body" :style='{"width":"65%","padding":"0","margin":"0","flex":"1","height":"auto"}'>
								<view :style='{"padding":"0 20rpx","overflow":"hidden","whiteSpace":"nowrap","color":"#333","width":"100%","lineHeight":"1.5","fontSize":"28rpx","textOverflow":"ellipsis"}' class="title ">{{item.title}}</view>
								<view :style='{"padding":"0 20rpx","margin":"0","overflow":"hidden","color":"#666","maxHeight":"144rpx","width":"100%","lineHeight":"36rpx","fontSize":"24rpx"}' class="text">{{item.introduction}}</view>
								<view :style='{"padding":"0 20rpx"}'>
									<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
									<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{item.addtime.split(' ')[0].replace(/\-/g,'-')}}</text>
								</view>
								<view :style='{"padding":"0 20rpx"}'>
									<text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#7fc7be"}'></text>
									<text :style='{"color":"#7fc7be","lineHeight":"1.5","fontSize":"24rpx"}'>{{item.name}}</text>
								</view>
							</view>
						</view>
						<view @tap="onNewsDetailTap(item.id)" v-if="index%2==1" class="list-item" :style='{"boxShadow":"0 2rpx 12rpx #dddddd","padding":"10rpx","margin":"0 0 30rpx 0","alignItems":"center","borderRadius":"10rpx","flexWrap":"wrap","background":"none","display":"flex","width":"100%","height":"auto"}'>
							<view class="list-item-body" :style='{"width":"65%","padding":"0","margin":"0","flex":"1","height":"auto"}'>
								<view :style='{"padding":"0 20rpx","overflow":"hidden","whiteSpace":"nowrap","color":"#333","width":"100%","lineHeight":"1.5","fontSize":"28rpx","textOverflow":"ellipsis"}' class="title ">{{item.title}}</view>
								<view :style='{"padding":"0 20rpx","margin":"0","overflow":"hidden","color":"#666","maxHeight":"144rpx","width":"100%","lineHeight":"36rpx","fontSize":"24rpx"}' class="text">{{item.introduction}}</view>
								<view :style='{"padding":"0 20rpx"}'>
									<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
									<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{item.addtime.split(' ')[0].replace(/\-/g,'-')}}</text>
								</view>
								<view :style='{"padding":"0 20rpx"}'>
									<text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#7fc7be"}'></text>
									<text :style='{"color":"#7fc7be","lineHeight":"1.5","fontSize":"24rpx"}'>{{item.name}}</text>
								</view>
							</view>
							<image :style='{"width":"30%","objectFit":"cover","borderRadius":"8rpx","display":"block","height":"200rpx"}' mode="aspectFill" class="listmpic" :src="baseUrl+item.picture"></image>
						</view>
					</block>
				</view>
			</view>
			<!-- 新闻资讯 -->
			<view v-if="scrollTop>200" @tap="scrollTopClick" :style='{"boxShadow":"0 8rpx 16rpx rgba(0,0,0,.3)","borderRadius":"50%","textAlign":"center","bottom":"20%","background":"#ff000030","width":"60rpx","lineHeight":"60rpx","position":"fixed","right":"20rpx","height":"60rpx","zIndex":"999"}'>
				<span class="icon iconfont icon-jiantou07" :style='{"color":"#fff"}'></span>
			</view>
		</view>
	</view>
</template>

<script>
    import menu from '@/utils/menu'
	import '@/assets/css/global-restaurant.css'
	import uniIcons from "@/components/uni-ui/lib/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				startX: 0,
				prevNumList4: '',
				numList4: 0,
				timerList4: null,
				flagList4: false,
				navigationActive: {"width":"16rpx","margin":"0 4rpx","borderRadius":"100%","background":"#e5f4f1","height":"16rpx"},
				navigationDefault: {"width":"16rpx","margin":"0 4rpx","borderRadius":"100%","background":"#fff","height":"16rpx"},
				options2: {
					effect: 'flip',
					loop : true
				},
				options3: {
					effect: 'cube',
					loop : true,
					cubeEffect: {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}
				},
				rows: 2,
				column: 4,
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
				role : '',
				menuList: [],
				swiperMenuList:[],
				user: {},
				tableName:'',
				menuColor: '#0e9488,#4eb3a6,#7fc7be,#67c23a,#0a756b,#e6a23c,#909399,#0e9488,#4eb3a6,#7fc7be,#0a756b,#67c23a,#909399'.split(','),
				btnColor: ['#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#e6a23c','#909399','#0e9488','#4eb3a6','#7fc7be','#0a756b','#67c23a','#909399'],
				queryList:[
					{
						queryName:"文章标题",
					},
				],
				queryIndex: 0,
				searchForm:{
					xinlizhishiwenzhangbiaoti:'',
				},
				CustomBar: '0',

				//轮播
				swiperList: [],
				xinlizhishilist: [],
				news: [],
				scrollTop: 0,
				indexLogoUrl: '',
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
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
		},
		async onLoad(){
			this.menuColor = this.menuColor.sort(()=> {
				return (0.5-Math.random());
			});
		},
		async onShow() {
			if (this.timerList4&&this.timerList4!=null) clearInterval(this.timerList4)
			this.swiperMenuList = []
			this.role = uni.getStorageSync("appRole");
			this.loadLogo()
			let table = uni.getStorageSync("nowTable");
			let res = {}
			if(table) {
				res = await this.$api.session(table);
				this.user = res.data;
				this.tableName = table;
			}
			let menus = menu.list();
			this.menuList = menus;
			this.menuList.forEach((item,key) => {
				if(key==0) {
					item.frontMenu.forEach((item2,key2) => {
						if(item2.child[0].buttons.indexOf("查看")>-1) {
							this.swiperMenuList.push(item2);
						}
					})
				}
			})
			this.btnColor = this.btnColor.sort(()=> {
				return (0.5-Math.random());
			});
			// let res;
			// 轮播图
			let swiperList = []
			res = await this.$api.list('config', {
				type: 1,
				limit: 100
			});
			for (let item of res.data.list) {
				if (item.name.indexOf('picture') >= 0 && item.value && item.value!="" && item.value!=null ) {
					swiperList.push({
						img: item.value,
						title: item.name,
						url: item.url
					});
				}
			}
			if (swiperList) {
				this.swiperList = swiperList;
			}
			
			this.prevNumList4 = this.swiperList.length - 1
			this.timerList4 = setInterval(this.autoPlayList4, 3000)

			// 推荐信息
			this.getRecommendList()
			this.getHomeList()
			this.getNewsList()
		},
		methods: {
			async loadLogo() {
				try {
					const rs = await this.$api.getPublic('config/info?name=bTopLogo')
					this.indexLogoUrl = rs.data && rs.data.value ? rs.data.value : ''
				} catch (e) {
					this.indexLogoUrl = ''
				}
			},
			scrollTopClick(){
				uni.pageScrollTo({
					scrollTop: 0
				})
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
			async getNewsList(){
				let res;
				let params = {
					page: 1,
					limit: 4,
					sort: 'id',
					order: 'desc',
				}
				// 心灵资讯
				res = await this.$api.list('news', params)
				this.news = res.data.list
			},
			homeTabClick2(index,name){
				this['home' + name + 'Index2'] = index
				this.getHomeList()
			},
			async getHomeList(){
				let res;
				let params;
			},
			recommendTabClick2(index,name){
				this[name + 'Index2'] = index
				this.getRecommendList()
			},
			async getRecommendList(){
				let res;
				let params;
				// 推荐信息
				params = {
					page: 1,
					limit: 6,
				}
				if(uni.getStorageSync("appUserid")) {
					res = await this.$api.recommend2('xinlizhishi', params);
				} else {
					res = await this.$api.recommend('xinlizhishi', params);
				}
				this.xinlizhishilist = res.data.list
				

			},
			autoPlayList4() {
				this.prevNumList4 = this.numList4
			
				this.numList4++
				if (this.numList4 == this.swiperList.length) this.numList4 = 0
			},
			touchStart(event) {
				this.startX = event.touches[0].clientX
				
				clearInterval(this.timerList4)
				this.flagList4 = true
			},
			touchMove(event) {
				const currentX = event.touches[0].clientX;
				const deltaX = currentX - this.startX;
				
				if (deltaX > 50) {
					// 向右滑动逻辑
					if (this.flagList4) {
						this.flagList4 = false
						
						this.prevNumList4 = this.numList4
						this.numList4++
						if (this.numList4 == this.swiperList.length) this.numList4 = 0
					}
					
				} else if (deltaX < -50) {
					// 向左滑动逻辑
					if (this.flagList4) {
						this.flagList4 = false
						
						this.prevNumList4 = this.numList4
						this.numList4--
						if (this.numList4 < 0) this.numList4 = this.swiperList.length - 1
					}
				}
			},
			touchEnd() {
				this.startX = 0
				this.timerList4 = setInterval(this.autoPlayList4, 3000)
				this.flagList4 = false
			},
			//查询条件切换
			queryChange(e) {
				this.queryIndex=e.detail.value;
				this.searchForm.xinlizhishiwenzhangbiaoti="";
			},
			//轮播图跳转
			onSwiperTap(e) {
				if(e.url) {
					if (e.url.indexOf('https') != -1) {
						// #ifdef MP-WEIXIN
						uni.navigateTo({
						    url: '../../common/linkOthers/linkOthers?url=' + encodeURIComponent(e.url),
						});
						return false
						// #endif
						window.open(e.url)
					} else {
						this.$utils.jump(e.url)
					}
				}
			},
			// 新闻详情
			onNewsDetailTap(id) {
				this.$utils.jump(`../news-detail/news-detail?id=${id}`)
			},
			// 推荐列表点击详情
			onDetailTap(tableName, id) {
				let url = `../${tableName}/detail?id=${id}`
				this.$utils.jump(url)
			},
			onPageTap(tableName){
				if(this.queryIndex==0) {
					uni.setStorageSync('indexQueryCondition',this.searchForm.xinlizhishiwenzhangbiaoti);
					this.searchForm.xinlizhishiwenzhangbiaoti = '';
				}
				let url = `../${tableName}/list`
				uni.navigateTo({
					url: url,
					fail: function(){
						uni.switchTab({
							url: url
						});
					}
				});
			},
			onPageTap2(index) {
				let url = '../' + index + '/list'
				uni.setStorageSync("useridTag",0);
				uni.navigateTo({
					url: url,
					fail: function() {
						uni.switchTab({
							url: url
						});
					}
				});
			},
			goQuick(url) {
				uni.navigateTo({
					url: url,
					fail: function() {
						uni.switchTab({
							url: url
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
		background: #f6f8fb;
	}
	/* 品牌头部 */
	.brand-header {
		display: flex;
		align-items: center;
		padding: 28rpx 28rpx 20rpx;
		background: #fff;
	}
	.brand-logo {
		width: 84rpx;
		height: 84rpx;
		border-radius: 22rpx;
		flex-shrink: 0;
		box-shadow: 0 8rpx 20rpx rgba(14, 148, 136, .22);
	}
	.brand-logo-text {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #0e9488 0%, #4eb3a6 100%);
		color: #fff;
		font-size: 44rpx;
		font-weight: 700;
	}
	.brand-copy {
		padding-left: 20rpx;
		flex: 1;
		min-width: 0;
	}
	.brand-name {
		color: #263238;
		font-size: 36rpx;
		font-weight: 700;
		line-height: 46rpx;
	}
	.brand-slogan {
		margin-top: 6rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 34rpx;
	}
	/* 轮播占位 */
	.swiper-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 360rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(160deg, #0e9488 0%, #4eb3a6 70%, #7fc7be 100%);
	}
	.swiper-placeholder-title {
		color: #fff;
		font-size: 40rpx;
		font-weight: 700;
		line-height: 56rpx;
	}
	.swiper-placeholder-sub {
		margin-top: 12rpx;
		color: rgba(255, 255, 255, .86);
		font-size: 26rpx;
		line-height: 38rpx;
	}
	.list-swiper-4 {
		overflow: hidden;
		border-radius: 0 0 28rpx 28rpx;
		box-shadow: 0 12rpx 36rpx rgba(42, 55, 78, .12);
	}
	.list-swiper-4 .animate__animated {
		--animate-delay: 300ms;
	}
	.list {
		.style2 {
			.tabView {
				.tab {
					border: none;
					border-radius: 40rpx;
					padding: 0 30rpx;
					margin: 0 10rpx;
					color: #4eb3a6;
					background: #0a756b;
				}
				.tabActive {
					border: none;
					border-radius: 40rpx;
					padding: 0 20rpx;
					margin: 0 10rpx;
					color: #fff;
					background: #0e9488;
				}
			}
		}
	}

	.quick-entry-panel {
		margin: 8rpx 20rpx 0;
		padding: 24rpx;
		width: calc(100% - 40rpx);
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 12rpx 32rpx rgba(61, 66, 82, .08);
	}
	.quick-entry-main {
		padding: 24rpx;
		border-radius: 16rpx;
		background: linear-gradient(135deg, #e5f4f1 0%, #e8f7f6 100%);
		display: flex;
		align-items: center;
		min-height: 128rpx;
	}
	.quick-entry-icon {
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 34rpx;
		font-weight: 600;
		flex-shrink: 0;
	}
	.quick-entry-icon.test {
		background: #0e9488;
	}
	.quick-entry-copy {
		padding: 0 20rpx;
		flex: 1;
		min-width: 0;
	}
	.quick-entry-title {
		color: #263238;
		font-size: 34rpx;
		font-weight: 600;
		line-height: 44rpx;
	}
	.quick-entry-desc {
		margin-top: 8rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 34rpx;
	}
	.quick-entry-arrow {
		color: #0e9488;
		font-size: 32rpx;
		flex-shrink: 0;
	}
	.quick-entry-grid {
		display: flex;
		gap: 16rpx;
		margin-top: 16rpx;
	}
	.quick-entry-item {
		flex: 1;
		padding: 22rpx 20rpx;
		border: 2rpx solid #eef0f6;
		border-radius: 14rpx;
		background: #fbfcff;
	}
	.quick-entry-item-title {
		color: #263238;
		font-size: 28rpx;
		font-weight: 600;
		line-height: 38rpx;
	}
	.quick-entry-item-desc {
		margin-top: 6rpx;
		color: #667085;
		font-size: 24rpx;
		line-height: 34rpx;
	}

	.menu_view {
		padding: 20rpx;
		margin: 20rpx 20rpx 0;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		width: calc(100% - 40rpx);
		justify-content: flex-start;
		flex-wrap: wrap;
		height: auto;
		.menu-item {
			padding: 12rpx 0;
			margin: 10rpx 0;
			width: 25%;
			height: auto;
			.iconarr {
				border-radius: 100%;
				padding: 0;
				margin: 0px auto;
				color: #7fc7be;
				background: none;
				display: block;
				width: 76rpx;
				font-size: 76rpx;
				line-height: 76rpx;
				height: 76rpx;
			}
			.text {
				padding: 0;
				margin: 12rpx auto 0;
				color: #263238;
				width: 100%;
				font-size: 26rpx;
				line-height: 34rpx;
				text-align: center;
			}
		}
	}
</style>
