<script>
	let remindTimer = null
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.getRemindAll()
		},
		onHide: function() {
			console.log('App Hide')
			clearTimeout(remindTimer)
		},
		methods:{
			compareDate(s1, s2) {
				return ((new Date(s1.replace(/-/g, "\/"))) > (new Date(s2.replace(/-/g, "\/"))));
			},
			removeHtmlTags(html) {
			    var regExp = /<[^>]+>/g; // 定义正则表达式，匹配所有的HTML标签
			    return html.replace(regExp, ''); // 将匹配到的HTML标签替换为空字符串
			},
			async getRemindAll(){
				let obj = {}
				if(uni.getStorageSync('appToken')&&uni.getStorageSync('appToken')!=null){
					let res = await this.$api.list('popupremind',{sort: 'remindtime',order:'asc',limit: 10000})
					if(res.data.list.length){
						for(let x in res.data.list){
							if(res.data.list[x].type=='全局'||(res.data.list[x].type=='个人'&&res.data.list[x].userid==uni.getStorageSync('appUserid'))){
								if(this.compareDate(this.$utils.getCurDateTime(),res.data.list[x].remindtime)){
									obj = await this.$api.page('storeup',{
										refid: res.data.list[x].id,
										tablename: 'popupremind',
										type: '61'
									})
									if(!obj.data.list.length){
										res.data.list[x].content = this.removeHtmlTags(res.data.list[x].content)
										await uni.showModal({
											title: res.data.list[x].title,
											content: res.data.list[x].content
										})
										await this.$api.add('storeup',{
											userid: uni.getStorageSync('appUserid'),
											refid: res.data.list[x].id,
											tablename: 'popupremind',
											name: res.data.list[x].title,
											type: '61',
										})
									}
								}
							}
						}
					}
				}
				remindTimer = setTimeout(()=>{
					this.getRemindAll()
				},20000)
			},
		}
	}
</script>

<style lang="scss">
	@import "/colorui/main.css";
	@import "/colorui/icon.css";
	/*每个页面公共css */
 	@import "/assets/css/style.scss";
	@import "/assets/css/quill.css";
	/* #ifndef MP-WEIXIN */
	@import url("https://at.alicdn.com/t/c/font_4097802_w9071sf3dx.css");
	/* #endif*/
	/* #ifdef MP-WEIXIN */
	@import "/colorui/font/iconfont.css";
	/* #endif */
	
	* {
		box-sizing: border-box;
	}
	button::after{
		border: none;
	}
	view, form, scroll-view, swiper, button, input, textarea, label, navigator, image {
	    box-sizing: border-box;
	}
	
	.uni-product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
		margin-top: 24px;
	}
	.uni-tabbar .uni-tabbar__label {
		font-size: 20rpx !important;
	}
</style>
