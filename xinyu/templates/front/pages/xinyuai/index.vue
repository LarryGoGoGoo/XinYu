<template>
	<view class="xinyuai-page">
		<!-- 顶部导航 -->
		<view class="header">
			<text class="back" @tap="goBack">‹</text>
			<text class="title">心语AI</text>
			<view class="clear-btn" @tap="clearChat">清空对话</view>
		</view>

		<!-- 风险预警条 -->
		<view v-if="showRisk" class="risk-bar">
			<text class="risk-bar-text"><text class="risk-bar-strong">安全提醒：</text>检测到您的消息中可能包含自我伤害相关内容。如果您正在经历心理危机，请立即拨打</text>
			<text class="risk-bar-strong">全国心理援助热线：12356</text>
			<text class="risk-bar-text">，或联系身边信任的人、前往最近的医院急诊。</text>
		</view>

		<!-- 消息区域 -->
		<scroll-view class="chat-area" scroll-y :scroll-into-view="scrollInto" scroll-with-animation>
			<view v-if="messages.length === 0" class="empty-state">
				<view class="welcome">
					<view class="welcome-icon">💡</view>
					<view class="welcome-line">你好，我是心语AI</view>
					<view class="welcome-line">一个温暖的倾听者</view>
					<view class="welcome-sub">有什么心事，都可以跟我说</view>
				</view>
				<view class="emotion-panel">
					<view class="emotion-panel-title">想从哪件事开始聊？</view>
					<view class="emotion-grid">
						<view v-for="item in emotionEntries" :key="item.label" class="emotion-item" @tap="quickStart(item)">
							<text>{{ item.label }}</text>
						</view>
					</view>
				</view>
			</view>

			<view v-for="(m, idx) in messages" :key="idx" class="msg" :class="m.role === 'user' ? 'msg-user' : 'msg-ai'">
				<view class="avatar" :class="m.role === 'user' ? 'avatar-user' : 'avatar-ai'">{{ m.role === 'user' ? '👤' : '🤖' }}</view>
				<view class="msg-body">
					<view class="bubble" :class="m.role === 'user' ? 'bubble-user' : 'bubble-ai'" :style="isDanger(m) ? 'background:#FEF2F2;border:1rpx solid #FECACA;color:#7f1d1d;' : ''">
						<text class="bubble-text">{{ m.content }}</text>
					</view>
					<view v-if="isDanger(m) && m.role === 'user'" class="crisis-card">
						<text class="crisis-text">⚠️ 检测到危机关键词，已通知心理医生关注</text>
						<text class="crisis-text">心理援助热线：<text class="hotline">12356</text></text>
					</view>
					<view class="time" :class="m.role === 'user' ? 'time-right' : ''">{{ m.time || currentTime() }}</view>
				</view>
			</view>

			<view v-if="loading" class="msg msg-ai">
				<view class="avatar avatar-ai">🤖</view>
				<view class="msg-body">
					<view class="bubble bubble-ai">
						<view class="typing"><view class="dot"></view><view class="dot"></view><view class="dot"></view></view>
					</view>
				</view>
			</view>
			<view id="msg-bottom" style="height: 20rpx;"></view>
		</scroll-view>

		<!-- 底部输入 -->
		<view class="input-area">
			<input class="msg-input" v-model="inputText" :disabled="loading" confirm-type="send" @confirm="sendMsg" placeholder="说说你的感受..." placeholder-style="color:#9aa6b2" maxlength="500" />
			<button class="send-btn" :disabled="loading || !inputText.trim()" @tap="sendMsg">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages: [],
				inputText: '',
				loading: false,
				showRisk: false,
				scrollInto: '',
				emotionEntries: [
					{ label: '焦虑', prompt: '我最近总是很焦虑，心里静不下来。' },
					{ label: '低落', prompt: '最近总是开心不起来，做什么都没劲。' },
					{ label: '压力', prompt: '事情太多，感觉快被压垮了。' },
					{ label: '孤独', prompt: '总觉得自己很孤独，没人理解我。' },
					{ label: '失眠', prompt: '晚上总是睡不着，脑子停不下来。' },
					{ label: '学业', prompt: '学习和考试让我很焦虑，怕考不好。' },
				],
			};
		},
		onLoad() {
			this.loadHistory();
		},
		methods: {
			goBack() {
				const pages = getCurrentPages();
				if (pages.length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({ url: '/pages/index/index' });
				}
			},
			currentTime() {
				const d = new Date();
				const h = String(d.getHours()).padStart(2, '0');
				const m = String(d.getMinutes()).padStart(2, '0');
				return h + ':' + m;
			},
			isDanger(m) {
				return m.risk_level === 'crisis' || m.risk_level === 'danger';
			},
			scrollToBottom() {
				this.$nextTick(() => {
					this.scrollInto = 'msg-bottom';
				});
			},
			async loadHistory() {
				try {
					const res = await this.$api.getPublic('xinyuai/history', {});
					if (res.data && res.data.list && res.data.list.length > 0) {
						this.messages = res.data.list.map((m) => ({
							role: m.role === 'user' ? 'user' : 'ai',
							content: m.content,
							risk_level: m.risk_level,
							time: (m.time || '').slice(11, 16),
						}));
						if (this.messages.some((m) => this.isDanger(m))) {
							this.showRisk = true;
						}
					}
					this.scrollToBottom();
				} catch (e) {}
			},
			quickStart(item) {
				this.inputText = item.prompt;
				this.sendMsg();
			},
			async sendMsg() {
				const text = (this.inputText || '').trim();
				if (!text || this.loading) return;
				this.inputText = '';
				this.messages.push({ role: 'user', content: text, risk_level: 'normal', time: this.currentTime() });
				this.scrollToBottom();
				this.loading = true;
				try {
					const res = await this.$api.postPublic('xinyuai/chat', { message: text });
					if (res.data) {
						if (res.data.risk_level === 'crisis' || res.data.risk_level === 'danger') {
							this.showRisk = true;
						}
						this.messages.push({ role: 'ai', content: res.data.reply, risk_level: res.data.risk_level, time: this.currentTime() });
					}
				} catch (e) {
					this.messages.push({ role: 'ai', content: '网络连接失败，请检查网络后重试', risk_level: 'normal', time: this.currentTime() });
				} finally {
					this.loading = false;
					this.scrollToBottom();
				}
			},
			clearChat() {
				uni.showModal({
					title: '提示',
					content: '确定清空所有对话记录吗？',
					success: async (r) => {
						if (!r.confirm) return;
						try {
							const res = await this.$api.postPublic('xinyuai/clear', {});
							if (res.code === 0) {
								this.messages = [];
								this.showRisk = false;
							}
						} catch (e) {}
					},
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.xinyuai-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: #f5f5f5;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 32rpx;
		background: linear-gradient(135deg, #4eb3a6, #0e9488);
		color: #ffffff;
		flex-shrink: 0;
	}
	.back {
		font-size: 44rpx;
		padding: 0 16rpx;
	}
	.title {
		font-size: 34rpx;
		font-weight: 600;
	}
	.clear-btn {
		font-size: 26rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 28rpx;
		padding: 10rpx 24rpx;
		color: #ffffff;
	}
	.risk-bar {
		background: #FEF2F2;
		border-bottom: 2rpx solid #FECACA;
		padding: 20rpx 32rpx;
		flex-shrink: 0;
	}
	.risk-bar-text {
		color: #DC2626;
		font-size: 26rpx;
		line-height: 40rpx;
	}
	.risk-bar-strong {
		color: #B91C1C;
		font-weight: 600;
	}
	.chat-area {
		flex: 1;
		min-height: 0;
	}
	.empty-state {
		padding: 60rpx 40rpx 40rpx;
	}
	.welcome {
		text-align: center;
		padding: 40rpx 0 48rpx;
		color: #9CA3AF;
		font-size: 28rpx;
		line-height: 48rpx;
	}
	.emotion-panel {
		background: #ffffff;
		border-radius: 24rpx;
		padding: 28rpx 24rpx;
		box-shadow: 0 8rpx 24rpx rgba(61, 66, 82, 0.06);
	}
	.emotion-panel-title {
		color: #263238;
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.emotion-grid {
		display: flex;
		flex-wrap: wrap;
	}
	.emotion-item {
		margin: 0 16rpx 16rpx 0;
		padding: 14rpx 28rpx;
		border-radius: 999rpx;
		background: #e5f4f1;
		color: #0e9488;
		font-size: 26rpx;
	}
	.welcome-icon {
		font-size: 96rpx;
		margin-bottom: 24rpx;
	}
	.welcome-line {
		color: #6B7280;
	}
	.welcome-sub {
		margin-top: 16rpx;
		font-size: 26rpx;
	}
	.msg {
		display: flex;
		align-items: flex-start;
		margin: 24rpx 24rpx 32rpx;
	}
	.msg-user {
		flex-direction: row-reverse;
	}
	.avatar {
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		flex-shrink: 0;
	}
	.avatar-ai {
		background: linear-gradient(135deg, #4eb3a6, #0e9488);
		margin-right: 16rpx;
	}
	.avatar-user {
		background: #E5E7EB;
		margin-left: 16rpx;
	}
	.msg-body {
		max-width: 75%;
	}
	.bubble {
		padding: 20rpx 28rpx;
		border-radius: 32rpx;
		display: inline-block;
	}
	.bubble-ai {
		background: #ffffff;
		color: #333333;
		border-top-left-radius: 8rpx;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.06);
	}
	.bubble-user {
		background: linear-gradient(135deg, #4eb3a6, #0e9488);
		color: #ffffff;
		border-top-right-radius: 8rpx;
	}
	.bubble-text {
		font-size: 30rpx;
		line-height: 48rpx;
		word-break: break-all;
		white-space: pre-wrap;
	}
	.crisis-card {
		background: #FEF2F2;
		border: 2rpx solid #FECACA;
		border-radius: 24rpx;
		padding: 20rpx 28rpx;
		margin-top: 16rpx;
	}
	.crisis-text {
		display: block;
		font-size: 26rpx;
		color: #991B1B;
		line-height: 40rpx;
	}
	.hotline {
		font-weight: 600;
		font-size: 30rpx;
		color: #DC2626;
	}
	.time {
		font-size: 22rpx;
		color: #999999;
		margin-top: 8rpx;
	}
	.time-right {
		text-align: right;
	}
	.typing {
		display: flex;
		align-items: center;
		padding: 8rpx 0;
	}
	.dot {
		width: 14rpx;
		height: 14rpx;
		background: #9CA3AF;
		border-radius: 50%;
		margin-right: 8rpx;
		animation: blink 1.4s infinite;
	}
	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}
	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}
	@keyframes blink {
		0%, 60%, 100% { opacity: 0.3; }
		30% { opacity: 1; }
	}
	.input-area {
		display: flex;
		align-items: center;
		padding: 20rpx 24rpx;
		background: #ffffff;
		border-top: 2rpx solid #E5E7EB;
		flex-shrink: 0;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	}
	.msg-input {
		flex: 1;
		height: 80rpx;
		padding: 0 32rpx;
		border-radius: 44rpx;
		background: #F9FAFB;
		border: 2rpx solid #E5E7EB;
		font-size: 30rpx;
		color: #263238;
	}
	.send-btn {
		margin-left: 16rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 40rpx;
		border-radius: 44rpx;
		background: linear-gradient(135deg, #4eb3a6, #0e9488);
		color: #ffffff;
		font-size: 30rpx;
	}
	.send-btn[disabled] {
		opacity: 0.5;
		color: #ffffff;
	}
</style>
