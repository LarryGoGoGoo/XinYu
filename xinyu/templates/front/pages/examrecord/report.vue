<template>
	<view class="report-page">
		<view class="summary-card">
			<view class="label">测评结果</view>
			<view class="paper-name">{{ report.papername || '心理测评' }}</view>
			<view class="score-row">
				<view>
					<view class="score">{{ displayScore }}</view>
					<view class="score-label">{{ isScl90 ? '总均分' : '综合指数' }}</view>
				</view>
				<view class="status" :class="{ warning: isWarning }">{{ isWarning ? '需关注' : '状态平稳' }}</view>
			</view>
		</view>

		<view v-if="isScl90" class="chart-card">
			<view class="section-title">九大因子雷达图</view>
			<qiun-data-charts type="radar" :chartData="radarData" :opts="radarOpts" canvasId="scl90Radar" />
		</view>

		<view v-if="isScl90" class="chart-card">
			<view class="section-title">因子得分</view>
			<qiun-data-charts type="column" :chartData="columnData" :opts="columnOpts" canvasId="scl90Column" />
		</view>

		<view v-if="isScl90" class="advice-card">
			<view class="section-title">分析与指导建议</view>
			<view class="metric-grid">
				<view class="metric-item">
					<view class="metric-value">{{ result.totalScore }}</view>
					<view class="metric-label">总分</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ result.positiveItemCount }}</view>
					<view class="metric-label">阳性项目数</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ result.positiveAverageScore }}</view>
					<view class="metric-label">阳性均分</view>
				</view>
			</view>
			<view v-if="warningFactors.length === 0" class="plain-tip">各因子均未超过预警阈值，建议继续保持规律作息、稳定运动和良好社会支持。</view>
			<view v-for="factor in warningFactors" :key="factor.key" class="advice-item">
				<view class="advice-title">{{ factor.name }}：{{ factor.score }}</view>
				<view class="advice-text">{{ factor.guidance }}</view>
			</view>
		</view>

		<view v-if="aiReport" class="ai-report-card">
			<view class="section-title">AI 个性化解读</view>
			<view class="ai-block">
				<view class="ai-block-title">总体解读</view>
				<view class="ai-block-text">{{ aiReport.summary }}</view>
			</view>
			<view class="ai-block">
				<view class="ai-block-title">相对优势</view>
				<view class="ai-block-text">{{ aiReport.strengths }}</view>
			</view>
			<view class="ai-block">
				<view class="ai-block-title">需要关注</view>
				<view class="ai-block-text">{{ aiReport.concerns }}</view>
			</view>
			<view class="ai-block">
				<view class="ai-block-title">行动建议</view>
				<view class="ai-block-text">{{ aiReport.advice }}</view>
			</view>
			<view v-if="aiReport.disclaimer" class="ai-disclaimer">{{ aiReport.disclaimer }}</view>
		</view>

		<view v-if="!isScl90" class="chart-card">
			<view class="section-title">测评概览</view>
			<qiun-data-charts type="column" :chartData="generalColumnData" :opts="generalColumnOpts" canvasId="generalReportColumn" />
		</view>

		<view v-if="!isScl90" class="advice-card">
			<view class="section-title">心理分析</view>
			<view class="metric-grid">
				<view class="metric-item">
					<view class="metric-value">{{ report.score || 0 }}</view>
					<view class="metric-label">综合指数</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ report.answeredCount || report.recordCount || 0 }}</view>
					<view class="metric-label">完成题目</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ generalCompletion }}%</view>
					<view class="metric-label">完成度</view>
				</view>
			</view>
			<view class="plain-tip">{{ generalAdvice }}</view>
		</view>

		<view class="medical-disclaimer">
			<view class="disclaimer-title">重要提示</view>
			<view class="disclaimer-text">本测评结果基于标准化心理量表自动计算，仅供参考，不构成任何医学诊断或治疗建议。心理状态受多种因素影响，测评结果可能存在偏差。若您近期持续感到情绪低落、焦虑或出现自伤念头，请及时联系专业心理医生或拨打全国心理援助热线 12356。</view>
		</view>

		<view class="bottom-actions">
			<button class="primary-btn" @tap="backToList">返回报告列表</button>
		</view>
	</view>
</template>

<script>
	import qiunDataCharts from '@/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

	export default {
		components: {
			qiunDataCharts
		},
		data() {
			return {
				paperid: '',
				examno: '',
				userid: '',
				report: {},
				result: {},
				aiReport: null,
				radarOpts: {
					color: ['#0a756b'],
					padding: [15, 15, 15, 15],
					dataLabel: false,
					legend: { show: false },
					extra: {
						radar: {
							max: 5,
							labelShow: true,
							gridType: 'radar',
							gridColor: '#d6e1e6'
						}
					}
				},
				columnOpts: {
					color: ['#38A878'],
					padding: [15, 10, 0, 10],
					legend: { show: false },
					xAxis: { disableGrid: true },
					yAxis: { data: [{ min: 0, max: 5 }] },
					extra: {
						column: {
							type: 'group',
							width: 14,
							activeBgColor: '#000000',
							activeBgOpacity: 0.08
						}
					}
				},
				generalColumnOpts: {
					color: ['#0a756b'],
					padding: [15, 10, 0, 10],
					legend: { show: false },
					xAxis: { disableGrid: true },
					yAxis: { data: [{ min: 0 }] },
					extra: {
						column: {
							type: 'group',
							width: 28,
							activeBgColor: '#000000',
							activeBgOpacity: 0.08
						}
					}
				}
			}
		},
		computed: {
			isScl90() {
				return this.result && this.result.scale === 'SCL-90'
			},
			displayScore() {
				if (this.isScl90) return this.result.averageScore || 0
				return this.report.score || 0
			},
			isWarning() {
				if (this.isScl90) return !!this.result.isPositive
				return Number(this.report.recordCount || 0) > 0 && Number(this.report.score || 0) > 0
			},
			factors() {
				return this.result.factors || []
			},
			warningFactors() {
				return this.factors.filter(item => item.warning)
			},
			radarData() {
				return {
					categories: this.factors.filter(item => item.key !== 'additional').map(item => item.name),
					series: [{
						name: '因子分',
						data: this.factors.filter(item => item.key !== 'additional').map(item => Number(item.score || 0))
					}]
				}
			},
			columnData() {
				return {
					categories: this.factors.map(item => item.name),
					series: [{
						name: '因子分',
						data: this.factors.map(item => Number(item.score || 0))
					}]
				}
			},
			generalCompletion() {
				const total = Number(this.report.questionCount || this.report.recordCount || 0)
				const answered = Number(this.report.answeredCount || this.report.recordCount || 0)
				if (!total) return 0
				return Math.min(100, Math.round(answered / total * 100))
			},
			generalColumnData() {
				return {
					categories: ['综合指数', '完成题目', '完成度'],
					series: [{
						name: '测评概览',
						data: [
							Number(this.report.score || 0),
							Number(this.report.answeredCount || this.report.recordCount || 0),
							Number(this.generalCompletion || 0)
						]
					}]
				}
			},
			generalAdvice() {
				if (!this.report.recordCount) return '暂未获取到本次测评结果，请返回测评列表重新进入报告。'
				if (Number(this.report.score || 0) > 0) {
					return '本次测评提示存在一定心理压力或情绪波动信号。建议结合最近的睡眠、学习工作压力、人际支持情况进行观察，保持规律作息和适度运动；若不适持续或影响生活，请及时联系心理医生进一步沟通。'
				}
				return '本次测评未提示明显异常信号。建议继续保持稳定作息、适量运动和积极的人际沟通，后续可定期复测以观察心理状态变化。'
			}
		},
		async onLoad(options) {
			this.paperid = options.paperid
			this.examno = options.examno
			this.userid = options.userid || ''
			await this.loadReport()
		},
		methods: {
			async loadReport() {
				const params = {
					paperid: this.paperid,
					examno: this.examno
				}
				if (this.userid) params.userid = this.userid
				const res = await this.$api.examResult(params)
				this.report = res.data || {}
				this.result = this.report.result || {}
				this.aiReport = this.report.aiReport || null
			},
			backToList() {
				uni.redirectTo({
					url: '/pages/examrecord/list'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.report-page {
		min-height: 100vh;
		background: #f7f8fb;
		padding: 24rpx;
	}
	.summary-card,
	.chart-card,
	.advice-card,
	.ai-report-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 16rpx 36rpx rgba(35, 45, 60, .08);
	}
	.label {
		color: #0a756b;
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}
	.paper-name {
		color: #242a31;
		font-size: 34rpx;
		font-weight: 700;
		line-height: 1.5;
	}
	.score-row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-top: 28rpx;
	}
	.score {
		color: #242a31;
		font-size: 64rpx;
		font-weight: 800;
	}
	.score-label {
		color: #8f86a0;
		font-size: 24rpx;
	}
	.status {
		border-radius: 999rpx;
		background: #e4f7ef;
		color: #23725b;
		padding: 12rpx 24rpx;
		font-size: 26rpx;
	}
	.status.warning {
		background: #fff0e8;
		color: #c75b2b;
	}
	.section-title {
		color: #242a31;
		font-size: 32rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}
	.metric-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16rpx;
		margin-bottom: 22rpx;
	}
	.metric-item {
		background: #edf5f7;
		border-radius: 12rpx;
		padding: 18rpx 10rpx;
		text-align: center;
	}
	.metric-value {
		color: #0a756b;
		font-size: 34rpx;
		font-weight: 700;
	}
	.metric-label {
		color: #81758f;
		font-size: 22rpx;
		margin-top: 6rpx;
	}
	.advice-item {
		border-top: 1rpx solid #eef0f4;
		padding-top: 20rpx;
		margin-top: 20rpx;
	}
	.advice-title {
		color: #c75b2b;
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 8rpx;
	}
	.advice-text,
	.plain-tip {
		color: #5f576d;
		font-size: 28rpx;
		line-height: 1.7;
	}
	.ai-report-card {
		background: linear-gradient(180deg, #f5f9fb 0%, #ffffff 100%);
		border: 1rpx solid #e3edf1;
	}
	.ai-block {
		margin-bottom: 20rpx;
	}
	.ai-block:last-of-type {
		margin-bottom: 0;
	}
	.ai-block-title {
		color: #0a756b;
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 8rpx;
	}
	.ai-block-text {
		color: #5f576d;
		font-size: 28rpx;
		line-height: 1.7;
	}
	.ai-disclaimer {
		margin-top: 20rpx;
		padding: 18rpx;
		background: #fff8ec;
		border-radius: 10rpx;
		color: #9a7b4f;
		font-size: 22rpx;
		line-height: 1.6;
	}
	.medical-disclaimer {
		margin-bottom: 24rpx;
		padding: 24rpx;
		background: #f0f6f5;
		border: 1rpx solid #d8e8e5;
		border-radius: 14rpx;
	}
	.disclaimer-title {
		color: #0a756b;
		font-size: 26rpx;
		font-weight: 700;
		margin-bottom: 10rpx;
	}
	.disclaimer-text {
		color: #5f6f6b;
		font-size: 24rpx;
		line-height: 1.7;
	}
	.bottom-actions {
		padding: 8rpx 0 34rpx;
	}
	.primary-btn {
		width: 100%;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 999rpx;
		background: #0a756b;
		color: #fff;
		font-size: 30rpx;
	}
</style>
