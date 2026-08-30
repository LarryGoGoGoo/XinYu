<template>
	<view class="exam-page">
		<view class="header-container" :style="{ paddingTop: padTop + 'px' }">
			<view class="header-action" @tap="leaveTap">退出</view>
			<view class="header-center">
				<view class="time">{{ SecondToDate }}</view>
				<view class="progress">{{ currentIndex + 1 }}/{{ list.length }}</view>
			</view>
			<view class="header-action" @tap="cardVisible = true">答题卡</view>
		</view>

		<view class="progress-track">
			<view class="progress-bar" :style="{ width: progressPercent + '%' }"></view>
		</view>

		<view v-if="currentQuestion" class="question-card">
			<view class="question-meta">
				<text class="question-type">{{ questionTypeText(currentQuestion.type) }}</text>
				<text class="answered-count">已答 {{ answeredCount }}/{{ list.length }}</text>
			</view>
			<view class="question-title">
				<rich-text :nodes="currentQuestion.questionname"></rich-text>
			</view>

			<view v-if="!isSubmit" class="answer-container">
				<view
					v-for="(option, optionIndex) in currentQuestion.options"
					:key="option.code"
					class="answer-item"
					:class="{ active: isOptionChecked(currentQuestion, option) }"
					@tap="selectOption(optionIndex)"
				>
					<view class="option-code">{{ option.code }}</view>
					<view class="option-text">{{ option.text }}</view>
				</view>

				<view v-if="isTextQuestion(currentQuestion)" class="subjective-box">
					<textarea v-model="currentQuestion.myanswer" class="subjective-input" :placeholder="currentQuestion.type == 3 ? '请输入填空答案' : '请输入答案'" auto-height @blur="syncCurrentAnswer"></textarea>
				</view>

				<view v-if="!isTextQuestion(currentQuestion) && currentQuestion.options.length === 0" class="empty-options">
					当前题目暂无可选项，请返回题库检查选项配置
				</view>
			</view>

			<view v-if="isSubmit && isEndFlag" class="tip-container">
				<view class="par">我的答案：{{ currentQuestion.myanswer || '未作答' }}</view>
				<view class="par">题目分析：{{ currentQuestion.analysis || '暂无解析' }}</view>
			</view>
		</view>

		<view class="bottom-actions" v-if="!isSubmit">
			<button class="ghost-btn" @tap="prevQuestion" :disabled="currentIndex === 0">上一题</button>
			<button class="ghost-btn" @tap="saveAndExit">保存并退出</button>
			<button v-if="!isLastQuestion" class="primary-btn" @tap="nextQuestion">下一题</button>
			<button v-else class="primary-btn" @tap="submitTap(false)">提交</button>
		</view>

		<view class="bottom-actions" v-if="isSubmit && isEndFlag">
			<button class="primary-btn full" @tap="endClick">退出</button>
		</view>

		<view v-if="cardVisible" class="card-mask" @tap="cardVisible = false">
			<view class="answer-card" @tap.stop>
				<view class="card-title">
					<text>题目列表</text>
					<text class="card-close" @tap="cardVisible = false">关闭</text>
				</view>
				<view class="question-grid">
					<view
						v-for="(item, index) in list"
						:key="item.id"
						class="grid-item"
						:class="{ answered: isAnswered(item), current: index === currentIndex }"
						@tap="jumpToQuestion(index)"
					>
						{{ index + 1 }}
					</view>
				</view>
				<view class="legend">
					<text><text class="dot answered-dot"></text>已答</text>
					<text><text class="dot pending-dot"></text>未答</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paper: {},
				isSubmit: false,
				currentIndex: 0,
				score: 0,
				inter: null,
				list: [],
				user: {},
				count: 0,
				padTop: 0,
				examno: '',
				hasSuject: false,
				isEndFlag: false,
				cardVisible: false,
				paperId: null,
				answerTimer: null
			}
		},
		async onLoad(options) {
			this.paperId = Number(options.id)
			this.examno = this.getUUID()
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.padTop = res.statusBarHeight
				}
			})
			await this.initExam()
		},
		onUnload() {
			this.clearRuntimeTimers()
		},
		destroyed() {
			this.clearRuntimeTimers()
		},
		computed: {
			currentQuestion() {
				return this.list[this.currentIndex]
			},
			isLastQuestion() {
				return this.currentIndex >= this.list.length - 1
			},
			answeredCount() {
				return this.list.filter(item => this.isAnswered(item)).length
			},
			progressPercent() {
				if (!this.list.length) return 0
				return Math.round(((this.currentIndex + 1) / this.list.length) * 100)
			},
			storageKey() {
				return `exam-progress-${this.paperId}-${this.user.id || 'guest'}`
			},
			SecondToDate() {
				let time = Number(this.count || 0)
				if (time <= 0) return '不限时'
				const hour = Math.floor(time / 3600)
				const minute = Math.floor((time % 3600) / 60)
				const second = time % 60
				if (hour > 0) return `${hour}小时${minute}分钟${second}秒`
				if (minute > 0) return `${minute}分钟${second}秒`
				return `${second}秒`
			}
		},
		methods: {
			async initExam() {
				this.score = 0
				let table = uni.getStorageSync("nowTable")
				let res = await this.$api.session(table)
				this.user = res.data

				res = await this.$api.info('exampaper', this.paperId)
				this.paper = res.data

				res = await this.$api.list('examquestion', {
					page: 1,
					limit: 999,
					paperid: this.paperId
				})
				const questions = (res.data.list || []).map(item => {
					item.questionname = String(item.questionname || '').replace(/img src/gi, 'img style="width:100%;" src')
					item.options = this.parseOptions(item.options)
					item.myanswer = item.type == 1 ? [] : ''
					return item
				}).sort((a, b) => (b.sequence || 0) - (a.sequence || 0))
				this.hasSuject = questions.some(item => this.isTextQuestion(item))
				this.list = questions

				await this.restoreProgress()
				this.startTimer()
			},
			parseOptions(options) {
				if (Array.isArray(options)) {
					return this.normalizeOptions(options)
				}
				if (options && typeof options === 'object') {
					return this.normalizeOptions(options)
				}
				const raw = String(options || '').trim()
				if (!raw || raw === '[]') return []
				try {
					return this.normalizeOptions(JSON.parse(raw))
				} catch (e) {
					try {
						return this.normalizeOptions(JSON.parse(raw.replace(/'/g, '"')))
					} catch (err) {
						return this.parsePlainOptions(raw)
					}
				}
			},
			normalizeOptions(parsed) {
				const codeSeed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
				let list = []
				if (Array.isArray(parsed)) {
					list = parsed
				} else if (parsed && typeof parsed === 'object') {
					list = Object.keys(parsed).map(key => {
						const value = parsed[key]
						if (value && typeof value === 'object') {
							return Object.assign({ code: key }, value)
						}
						return { code: key, text: value }
					})
				}
				return list.map((item, index) => {
					const option = item && typeof item === 'object' ? item : { text: item }
					const code = String(option.code || option.value || option.key || codeSeed[index] || (index + 1)).trim()
					let text = String(option.text || option.label || option.name || option.title || option.content || option.value || '').trim()
					if (!text && item !== null && typeof item !== 'object') text = String(item).trim()
					const prefixReg = new RegExp('^' + code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\.．、:：\\s]+', 'i')
					text = text.replace(prefixReg, '').trim()
					return {
						code,
						text,
						score: option.score,
						checked: false
					}
				}).filter(item => item.text !== '' || item.code !== '')
			},
			parsePlainOptions(raw) {
				const lines = raw
					.replace(/\r/g, '\n')
					.split(/\n|;|；/)
					.map(item => item.trim())
					.filter(Boolean)
				if (lines.length > 1) {
					return this.normalizeOptions(lines.map(item => {
						const match = item.match(/^([A-Z]|[0-9]+)[\.．、:：\s]+(.+)$/i)
						return match ? { code: match[1].toUpperCase(), text: match[2] } : { text: item }
					}))
				}
				const matches = raw.match(/([A-Z][\.．、:：]\s*[^A-Z]+)/gi)
				if (matches && matches.length) {
					return this.normalizeOptions(matches.map(item => {
						const match = item.trim().match(/^([A-Z])[\.．、:：]\s*(.+)$/i)
						return match ? { code: match[1].toUpperCase(), text: match[2] } : { text: item }
					}))
				}
				return []
			},
			startTimer() {
				clearInterval(this.inter)
				this.count = Number(this.paper.time || 0) * 60
				if (this.count <= 0) return
				this.inter = setInterval(() => {
					this.count -= 1
					if (this.count < 0) {
						clearInterval(this.inter)
						this.submitTap(true)
					}
				}, 1000)
			},
			async restoreProgress() {
				let remote = null
				try {
					const res = await this.$api.examProgress({ paperid: this.paperId })
					if (res.data && res.data.answers) {
						remote = res.data
					}
				} catch (e) {}
				const local = uni.getStorageSync(this.storageKey)
				if (local && local.answers && (!remote || Number(local.updatedAt || 0) >= Number(remote.updatedAt || 0))) {
					this.applyProgress(local)
				} else if (remote) {
					this.applyProgress(remote)
				}
			},
			applyProgress(progress) {
				this.examno = progress.examno || this.examno
				const nextIndex = Number(progress.currentIndex || 0)
				this.currentIndex = Number.isNaN(nextIndex) ? 0 : Math.max(0, Math.min(nextIndex, Math.max(this.list.length - 1, 0)))
				const answers = progress.answers || {}
				this.list.forEach(question => {
					const value = answers[String(question.id)]
					if (value !== undefined) {
						question.myanswer = value
						this.markOptionChecked(question)
					}
				})
			},
			getAnswers() {
				const answers = {}
				this.list.forEach(item => {
					if (this.isAnswered(item)) {
						answers[String(item.id)] = item.myanswer
					}
				})
				return answers
			},
			getUUID() {
				return `${Date.now()}${Math.floor(Math.random() * 1000)}`
			},
			questionTypeText(type) {
				if (type == 4) return '主观题'
				if (type == 3) return '填空题'
				if (type == 1) return '多选题'
				if (type == 2) return '判断题'
				return '单选题'
			},
			isTextQuestion(question) {
				return question && (question.type == 3 || question.type == 4)
			},
			isAnswered(item) {
				if (!item) return false
				if (Array.isArray(item.myanswer)) return item.myanswer.length > 0
				return item.myanswer !== undefined && item.myanswer !== null && String(item.myanswer) !== ''
			},
			isOptionChecked(question, option) {
				if (Array.isArray(question.myanswer)) {
					return question.myanswer.indexOf(option.code) > -1
				}
				return String(question.myanswer) === String(option.code)
			},
			selectOption(optionIndex) {
				const question = this.currentQuestion
				if (!question || !question.options[optionIndex]) return
				const option = question.options[optionIndex]
				if (question.type == 1) {
					const answers = Array.isArray(question.myanswer) ? question.myanswer.slice() : []
					const existsIndex = answers.indexOf(option.code)
					if (existsIndex > -1) {
						answers.splice(existsIndex, 1)
					} else {
						answers.push(option.code)
					}
					question.myanswer = answers.sort()
				} else {
					question.myanswer = option.code
				}
				this.markOptionChecked(question)
				this.syncCurrentAnswer()
				if (question.type != 1) {
					clearTimeout(this.answerTimer)
					this.answerTimer = setTimeout(() => {
						if (!this.isLastQuestion) this.nextQuestion()
					}, 260)
				}
			},
			markOptionChecked(question) {
				question.options = question.options.map(option => Object.assign({}, option, {
					checked: this.isOptionChecked(question, option)
				}))
				this.$forceUpdate()
			},
			syncCurrentAnswer() {
				uni.setStorageSync(this.storageKey, {
					examno: this.examno,
					paperid: this.paperId,
					papername: this.paper.name,
					currentIndex: this.currentIndex,
					answers: this.getAnswers(),
					updatedAt: Date.now()
				})
			},
			prevQuestion() {
				if (this.currentIndex > 0) this.currentIndex -= 1
				this.syncCurrentAnswer()
			},
			nextQuestion() {
				if (!this.isLastQuestion) this.currentIndex += 1
				this.syncCurrentAnswer()
			},
			jumpToQuestion(index) {
				if (index < 0 || index >= this.list.length) return
				this.currentIndex = index
				this.cardVisible = false
				this.syncCurrentAnswer()
			},
			async saveProgress() {
				const payload = {
					examno: this.examno,
					paperid: this.paperId,
					papername: this.paper.name,
					currentIndex: this.currentIndex,
					answers: this.getAnswers(),
					updatedAt: Date.now()
				}
				uni.setStorageSync(this.storageKey, payload)
				await this.$api.saveExamProgress(payload)
			},
			async saveAndExit() {
				try {
					await this.saveProgress()
					this.$utils.msgBack('已保存作答进度')
				} catch (e) {
					uni.showToast({
						title: '已保存到本地，服务器同步失败',
						icon: 'none'
					})
				}
			},
			leaveTap() {
				uni.showModal({
					title: '提示',
					content: '是否保存当前进度并退出？',
					confirmText: '保存退出',
					cancelText: '继续作答',
					success: async (res) => {
						if (res.confirm) {
							await this.saveAndExit()
						}
					}
				})
			},
			clearRuntimeTimers() {
				clearInterval(this.inter)
				clearTimeout(this.answerTimer)
			},
			async submitTap(force = false) {
				force = force === true
				if (!force && this.answeredCount < this.list.length) {
					uni.showModal({
						title: '仍有未答题目',
						content: `还有 ${this.list.length - this.answeredCount} 题未完成，确认提交吗？`,
						success: async (res) => {
							if (res.confirm) await this.doSubmit()
						}
					})
					return
				}
				await this.doSubmit()
			},
			async doSubmit() {
				const res = await this.$api.submitExam({
					examno: this.examno,
					paperid: this.paperId,
					answers: this.getAnswers()
				})
				this.isSubmit = true
				this.score = res.data.score
				uni.removeStorageSync(this.storageKey)
				this.clearRuntimeTimers()
				uni.showModal({
					title: '测评完成',
					content: '本次测评已生成心理分析报告。',
					showCancel: false,
					confirmText: '结果报告',
					success: (modalRes) => {
						if (modalRes.confirm) {
							uni.redirectTo({
								url: `/pages/examrecord/report?paperid=${this.paperId}&examno=${this.examno}`
							})
						}
					}
				})
			},
			endClick() {
				uni.navigateBack({ delta: 1 })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.exam-page {
		min-height: 100vh;
		background: #f7f8fb;
		padding-bottom: 150rpx;
	}
	.header-container {
		display: flex;
		align-items: center;
		background: #ffffff;
		border-bottom: 1rpx solid #eef0f4;
		padding: 10rpx 24rpx 18rpx;
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.header-action {
		color: #0a756b;
		font-size: 28rpx;
		width: 120rpx;
	}
	.header-center {
		flex: 1;
		text-align: center;
	}
	.time {
		color: #333;
		font-size: 30rpx;
		font-weight: 600;
	}
	.progress {
		color: #7d8591;
		font-size: 24rpx;
		margin-top: 4rpx;
	}
	.progress-track {
		height: 8rpx;
		background: #dce7ed;
	}
	.progress-bar {
		height: 8rpx;
		background: #0a756b;
		transition: width .25s ease;
	}
	.question-card {
		margin: 28rpx 24rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		box-shadow: 0 16rpx 36rpx rgba(35, 45, 60, .08);
	}
	.question-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 22rpx;
	}
	.question-type {
		background: #e9f5f6;
		color: #0a756b;
		border-radius: 999rpx;
		padding: 8rpx 18rpx;
		font-size: 24rpx;
	}
	.answered-count {
		color: #7d8591;
		font-size: 24rpx;
	}
	.question-title {
		color: #242a31;
		font-size: 34rpx;
		line-height: 1.7;
		margin-bottom: 28rpx;
	}
	.answer-item {
		display: flex;
		align-items: center;
		min-height: 88rpx;
		border: 2rpx solid #e7ecef;
		border-radius: 12rpx;
		padding: 18rpx 20rpx;
		margin-bottom: 18rpx;
		background: #fff;
		transition: all .2s ease;
	}
	.answer-item.active {
		border-color: #0a756b;
		background: #eaf5f6;
	}
	.option-code {
		width: 52rpx;
		height: 52rpx;
		border-radius: 50%;
		background: #e8eef1;
		color: #0a756b;
		text-align: center;
		line-height: 52rpx;
		font-weight: 600;
		margin-right: 18rpx;
	}
	.answer-item.active .option-code {
		background: #0a756b;
		color: #fff;
	}
	.option-text {
		flex: 1;
		color: #30343b;
		font-size: 30rpx;
		line-height: 1.5;
	}
	.subjective-box {
		border: 2rpx solid #e7ecef;
		border-radius: 12rpx;
		padding: 20rpx;
	}
	.subjective-input {
		width: 100%;
		min-height: 180rpx;
		font-size: 30rpx;
		line-height: 1.6;
		color: #30343b;
	}
	.empty-options {
		border: 2rpx dashed #d7e1e6;
		border-radius: 12rpx;
		background: #f5f8fa;
		color: #7d8591;
		font-size: 28rpx;
		line-height: 1.6;
		padding: 28rpx;
	}
	.bottom-actions {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		gap: 16rpx;
		padding: 20rpx 24rpx calc(20rpx + env(safe-area-inset-bottom));
		background: rgba(255, 255, 255, .96);
		box-shadow: 0 -12rpx 28rpx rgba(35, 45, 60, .08);
	}
	.ghost-btn,
	.primary-btn {
		flex: 1;
		border-radius: 999rpx;
		height: 82rpx;
		line-height: 82rpx;
		font-size: 28rpx;
	}
	.ghost-btn {
		color: #0a756b;
		background: #eaf2f5;
	}
	.primary-btn {
		color: #fff;
		background: #0a756b;
	}
	.primary-btn.full {
		width: 100%;
	}
	.card-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(20, 15, 30, .36);
		z-index: 30;
		display: flex;
		align-items: flex-end;
	}
	.answer-card {
		width: 100%;
		max-height: 72vh;
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 28rpx 24rpx 40rpx;
	}
	.card-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 24rpx;
	}
	.card-close {
		font-size: 26rpx;
		color: #0a756b;
	}
	.question-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 16rpx;
		max-height: 52vh;
		overflow-y: auto;
	}
	.grid-item {
		height: 72rpx;
		border-radius: 12rpx;
		background: #f1f3f5;
		color: #6f7782;
		text-align: center;
		line-height: 72rpx;
		font-size: 28rpx;
	}
	.grid-item.answered {
		background: #dff3ec;
		color: #23725b;
	}
	.grid-item.current {
		background: #0a756b;
		color: #fff;
	}
	.legend {
		display: flex;
		gap: 28rpx;
		margin-top: 24rpx;
		color: #6f7782;
		font-size: 24rpx;
	}
	.dot {
		display: inline-block;
		width: 18rpx;
		height: 18rpx;
		border-radius: 50%;
		margin-right: 8rpx;
	}
	.answered-dot {
		background: #38a878;
	}
	.pending-dot {
		background: #d8d0e3;
	}
	.tip-container {
		margin-top: 30rpx;
		border-top: 1rpx solid #eef0f4;
		padding-top: 24rpx;
		color: #5f576d;
		line-height: 1.7;
	}
	.par {
		margin-bottom: 16rpx;
	}
</style>
