<template>
	<view class="doctor-page">
		<!-- 症状选择 -->
		<view class="card">
			<view class="card-title">你最近有哪些不适？<text class="card-sub">（可多选）</text></view>
			<view class="symptom-grid">
				<view
					v-for="s in symptomOptions"
					:key="s"
					class="symptom-item"
					:class="selected.includes(s) ? 'symptom-active' : ''"
					@tap="toggleSymptom(s)"
				>
					<text>{{s}}</text>
				</view>
			</view>
			<textarea
				class="symptom-input"
				v-model="customText"
				placeholder="还可以补充其他症状、持续时间、诱因等…"
				placeholder-style="color:#9aa6b2"
				maxlength="500"
			></textarea>
			<button class="submit-btn" :disabled="loading || !hasInput" @tap="getAdvice">获取建议</button>
		</view>

		<!-- 结果卡片 -->
		<view v-if="result" class="card result-card">
			<view class="result-header">
				<text class="result-title">参考建议</text>
				<text v-if="result.source === 'llm'" class="source-badge">AI 生成</text>
				<text v-else class="source-badge source-local">规则参考</text>
			</view>
			<view class="result-row">
				<text class="result-label">可能倾向</text>
				<text class="result-value">{{result.tendency}}</text>
			</view>
			<view class="result-row">
				<text class="result-label">建议科室</text>
				<text class="result-value">{{result.department}}</text>
			</view>
			<view class="result-row">
				<text class="result-label">建议行动</text>
				<text class="result-value">{{result.action}}</text>
			</view>
			<view v-if="result.advice" class="result-row">
				<text class="result-label">温馨提醒</text>
				<text class="result-value">{{result.advice}}</text>
			</view>
			<view class="disclaimer">{{result.disclaimer}}</view>
		</view>

		<!-- 历史记录 -->
		<view v-if="history.length > 0" class="card">
			<view class="card-title">历史查询</view>
			<view v-for="h in history" :key="h.id" class="history-item">
				<view class="history-symptom">{{h.symptoms}}</view>
				<view class="history-dept">建议：{{h.department}}</view>
				<view class="history-time">{{h.addtime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				symptomOptions: [
					'情绪低落', '焦虑', '心慌', '失眠', '头痛', '胸闷',
					'胃痛', '乏力', '头晕', '耳鸣', '食欲不振', '暴食',
					'慢性疼痛', '手抖出汗', '注意力不集中', '强迫行为',
				],
				selected: [],
				customText: '',
				loading: false,
				result: null,
				history: [],
			};
		},
		computed: {
			hasInput() {
				return this.selected.length > 0 || this.customText.trim().length > 0;
			}
		},
		onShow() {
			this.loadHistory();
		},
		methods: {
			toggleSymptom(s) {
				const idx = this.selected.indexOf(s);
				if (idx > -1) {
					this.selected.splice(idx, 1);
				} else {
					this.selected.push(s);
				}
			},
			buildSymptoms() {
				const parts = [...this.selected];
				const extra = this.customText.trim();
				if (extra) parts.push(extra);
				return parts.join('；');
			},
			async getAdvice() {
				if (!this.hasInput || this.loading) return;
				this.loading = true;
				try {
					const res = await this.$api.postPublic('doctoradvice/advice', {
						symptoms: this.buildSymptoms(),
					});
					if (res.data) {
						this.result = res.data;
					}
					this.loadHistory();
				} catch (e) {
					uni.showToast({ title: '获取建议失败，请稍后再试', icon: 'none' });
				} finally {
					this.loading = false;
				}
			},
			async loadHistory() {
				try {
					const res = await this.$api.getPublic('doctoradvice/history', {});
					if (res.data) {
						this.history = res.data.slice(0, 5);
					}
				} catch (e) {}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.doctor-page {
		min-height: 100vh;
		background: #f4f8f7;
		padding: 24rpx;
		box-sizing: border-box;
	}
	.card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 28rpx 24rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 8rpx 24rpx rgba(61, 66, 82, 0.06);
	}
	.card-title {
		color: #263238;
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.card-sub {
		color: #9aa6b2;
		font-size: 24rpx;
		font-weight: 400;
	}
	.symptom-grid {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 8rpx;
	}
	.symptom-item {
		margin: 0 16rpx 16rpx 0;
		padding: 14rpx 28rpx;
		border-radius: 999rpx;
		background: #f4f8f7;
		color: #667085;
		font-size: 26rpx;
		border: 2rpx solid transparent;
	}
	.symptom-active {
		background: #e5f4f1;
		color: #0e9488;
		border-color: #0e9488;
	}
	.symptom-input {
		width: 100%;
		height: 160rpx;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		background: #f4f8f7;
		font-size: 26rpx;
		color: #263238;
		margin-bottom: 20rpx;
	}
	.submit-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		background: #0e9488;
		color: #ffffff;
		font-size: 28rpx;
	}
	.submit-btn[disabled] {
		background: #b7d7d2;
	}
	.result-card {
		border-left: 8rpx solid #0e9488;
	}
	.result-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.result-title {
		color: #263238;
		font-size: 32rpx;
		font-weight: 600;
		flex: 1;
	}
	.source-badge {
		font-size: 22rpx;
		padding: 4rpx 16rpx;
		border-radius: 999rpx;
		color: #0e9488;
		background: #e5f4f1;
	}
	.source-local {
		color: #d98a00;
		background: rgba(217, 138, 0, 0.12);
	}
	.result-row {
		margin-bottom: 20rpx;
	}
	.result-label {
		display: block;
		color: #0e9488;
		font-size: 24rpx;
		margin-bottom: 6rpx;
	}
	.result-value {
		display: block;
		color: #263238;
		font-size: 28rpx;
		line-height: 42rpx;
	}
	.disclaimer {
		margin-top: 16rpx;
		padding-top: 20rpx;
		border-top: 2rpx solid #eef0f6;
		color: #9aa6b2;
		font-size: 22rpx;
		line-height: 34rpx;
	}
	.history-item {
		padding: 20rpx 0;
		border-bottom: 2rpx solid #f0f3f7;
	}
	.history-item:last-child {
		border-bottom: none;
	}
	.history-symptom {
		color: #263238;
		font-size: 26rpx;
		margin-bottom: 6rpx;
	}
	.history-dept {
		color: #0e9488;
		font-size: 24rpx;
		margin-bottom: 4rpx;
	}
	.history-time {
		color: #9aa6b2;
		font-size: 22rpx;
	}
</style>
