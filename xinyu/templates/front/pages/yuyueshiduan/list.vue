  <template>
	<view class="schedule-page">
		<!-- 顶部标题栏 -->
		<view class="schedule-page__header">
			<text class="schedule-page__title">预约排班 · 一周时间表</text>
			<text class="schedule-page__sub">行 = 预约时段　列 = 周一至周日</text>
		</view>

		<!-- 周表 -->
		<view class="week-table" v-if="slotRows.length">
			<view class="week-table__row week-table__head">
				<view class="week-table__cell week-table__corner">时段</view>
				<view
					class="week-table__cell week-table__day"
					:class="{ 'is-today': d.isToday }"
					v-for="d in days"
					:key="d.key"
				>
					<text class="week-table__day-name">{{ d.weekday }}</text>
					<text class="week-table__day-date">{{ d.dateText }}</text>
				</view>
			</view>

			<view class="week-table__row" v-for="row in slotRows" :key="row.key">
				<view class="week-table__cell week-table__slot">
					<text class="week-table__slot-time">{{ row.label }}</text>
				</view>
				<view
					class="week-table__cell week-table__body"
					:class="{ 'is-today': d.isToday }"
					v-for="d in days"
					:key="d.key"
				>
					<view
						class="schedule-item"
						:class="item.statusCls"
						v-for="(item, idx) in row.appointments[d.key]"
						:key="idx"
						@tap="onAppointmentTap(item)"
					>
						<text class="schedule-item__name">{{ item.yonghuxingming || item.yonghuzhanghao || '匿名' }}</text>
						<text class="schedule-item__status">{{ item.statusText }}</text>
					</view>
					<view v-if="!row.appointments[d.key].length" class="schedule-item schedule-item--empty">·</view>
				</view>
			</view>

			<!-- 图例 -->
			<view class="week-table__legend">
				<view class="legend-item"><view class="legend-dot legend-dot--ok"></view>已确认</view>
				<view class="legend-item"><view class="legend-dot legend-dot--wait"></view>待审核</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="schedule-empty" v-else-if="!loading">
			<text class="schedule-empty__icon">📅</text>
			<text class="schedule-empty__text">本周暂无排班预约</text>
			<text class="schedule-empty__hint">请在下方维护预约时段，用户预约后将自动出现在对应格子</text>
		</view>

		<!-- 时段字典管理 -->
		<view class="slot-manage">
			<view class="slot-manage__head">
				<text class="slot-manage__title">预约时段字典</text>
				<text class="slot-manage__tip">预约咨询的「预约时段」从这里选</text>
			</view>

			<view class="slot-manage__add" v-if="userid && isAuth('yuyueshiduan','新增')">
				<input
					class="slot-manage__input"
					v-model="newSlot"
					type="text"
					placeholder="如 09:00-10:00"
				/>
				<button class="slot-manage__btn" @tap="onAddSlot">添加时段</button>
			</view>

			<view class="slot-chip" v-for="row in slotList" :key="row.id">
				<text class="slot-chip__text">{{ row.yuyueshiduan }}</text>
				<view class="slot-chip__ops">
					<text
						v-if="userid && isAuth('yuyueshiduan','修改')"
						class="slot-chip__op slot-chip__op--edit"
						@tap="onUpdateSlot(row)"
					>修改</text>
					<text
						v-if="userid && isAuth('yuyueshiduan','删除')"
						class="slot-chip__op slot-chip__op--del"
						@tap="onDeleteSlot(row)"
					>删除</text>
				</view>
			</view>
			<view class="slot-manage__empty" v-if="!slotList.length && !loading">暂无时段，请添加</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				loading: true,
				// 预约时段字典
				slotList: [],
				newSlot: '',
				// 本周排班
				appointments: [],
				days: [],
				slotRows: [],
			};
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		onUnload() {
			uni.removeStorageSync("useridTag");
		},
		async onLoad() {
			this.buildWeekDays();
			this.userid = uni.getStorageSync("useridTag") == 1 ? uni.getStorageSync("useridTag") : '';
			await this.reload();
		},
		async onShow() {
			// 修改/新增返回后刷新
			if (this._loaded) this.reload();
			this._loaded = true;
		},
		methods: {
			// 构建本周周一~周日
			buildWeekDays() {
				const now = new Date();
				const day = now.getDay(); // 0=周日
				const mondayOffset = day === 0 ? -6 : 1 - day;
				const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
				this.days = [];
				for (let i = 0; i < 7; i++) {
					const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset + i);
					const mm = (d.getMonth() + 1).toString().padStart(2, '0');
					const dd = d.getDate().toString().padStart(2, '0');
					this.days.push({
						key: `${d.getFullYear()}-${mm}-${dd}`,
						weekday: `周${weekdays[i]}`,
						dateText: `${mm}-${dd}`,
						isToday: d.toDateString() === now.toDateString(),
					});
				}
			},
			async reload() {
				this.loading = true;
				await Promise.all([this.loadSlots(), this.loadAppointments()]);
				this.loading = false;
				this.buildTable();
			},
			async loadSlots() {
				// 用 list 拉全部时段字典（字典量小，取大 limit）
				const res = await this.$api.list(`yuyueshiduan`, { page: 1, limit: 200, sort: 'yuyueshiduan', order: 'asc' });
				const list = (res && res.data && res.data.list) || [];
				this.slotList = list.map(item => ({
					id: item.id,
					yuyueshiduan: item.yuyueshiduan,
				}));
			},
			async loadAppointments() {
				// 医生/admin 用 page，普通用户用 list；仅取本周待审核+已确认的预约
				const params = { page: 1, limit: 500, sort: 'yuyueshiduan', order: 'asc' };
				let res;
				if (this.userid) {
					res = await this.$api.page(`yuyuezixun`, params);
				} else {
					res = await this.$api.list(`yuyuezixun`, params);
				}
				const list = (res && res.data && res.data.list) || [];
				this.appointments = list.filter(item => item.sfsh !== '否');
			},
			buildTable() {
				// 1. 先把预约按「日期 + 时段」归组（本周内）
				const byDateSlot = {};
				const currentWeekKeys = this.days.map(d => d.key);
				for (const item of this.appointments) {
					const dateKey = (item.yuyueshijian || '').toString().slice(0, 10);
					// 不在本周的预约不显示在周表（避免跨周混乱）
					if (currentWeekKeys.indexOf(dateKey) === -1) continue;
					const slotKey = item.yuyueshiduan || '未指定';
					const k = dateKey + '|' + slotKey;
					if (!byDateSlot[k]) byDateSlot[k] = [];
					byDateSlot[k].push(item);
				}

				// 2. 行 = 预约时段（去重排序）
				const slotSet = new Set(this.slotList.map(s => s.yuyueshiduan));
				for (const item of this.appointments) {
					const dateKey = (item.yuyueshijian || '').toString().slice(0, 10);
					if (currentWeekKeys.indexOf(dateKey) === -1) continue;
					slotSet.add(item.yuyueshiduan || '未指定');
				}
				const labels = Array.from(slotSet).sort((a, b) => String(a).localeCompare(String(b)));

				// 3. 组装行列矩阵
				this.slotRows = labels.map(label => {
					const row = { label, key: label, appointments: {} };
					for (const d of this.days) {
						const arr = byDateSlot[d.key + '|' + label] || [];
						row.appointments[d.key] = arr.map(item => ({
							...item,
							statusCls: item.sfsh === '是' ? 'is-ok' : item.sfsh === '否' ? 'is-no' : 'is-wait',
							statusText: item.sfsh === '是' ? '已确认' : item.sfsh === '否' ? '未通过' : '待审核',
						}));
					}
					return row;
				});
			},
			onAppointmentTap(item) {
				// 跳到预约咨询详情
				this.$utils.jump(`../yuyuezixun/detail?id=${item.id}`);
			},
			async onAddSlot() {
				if (!this.newSlot || !this.newSlot.trim()) {
					this.$utils.msg('请输入时段，如 09:00-10:00');
					return;
				}
				await this.$api.add(`yuyueshiduan`, { yuyueshiduan: this.newSlot.trim() });
				this.newSlot = '';
				this.$utils.msg('添加成功');
				this.reload();
			},
			onUpdateSlot(row) {
				uni.setStorageSync("useridTag", this.userid);
				this.$utils.jump(`./add-or-update?id=${row.id}`);
			},
			onDeleteSlot(row) {
				const that = this;
				uni.showModal({
					title: '提示',
					content: `确认删除时段「${row.yuyueshiduan}」？`,
					success: async function (res) {
						if (res.confirm) {
							await that.$api.del('yuyueshiduan', JSON.stringify([row.id]));
							that.$utils.msg('删除成功');
							that.reload();
						}
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.schedule-page {
		min-height: 100vh;
		background: #f7faf9;
		padding: 32rpx 24rpx 60rpx;
		box-sizing: border-box;
	}

	.schedule-page__header {
		padding: 8rpx 8rpx 24rpx;
		display: flex;
		flex-direction: column;
	}

	.schedule-page__title {
		font-size: 36rpx;
		font-weight: 600;
		color: #1f3b37;
	}

	.schedule-page__sub {
		font-size: 24rpx;
		color: #8aa39d;
		margin-top: 8rpx;
	}

	/* 周表 */
	.week-table {
		background: #ffffff;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 32rpx rgba(14, 148, 136, 0.08);
	}

	.week-table__row {
		display: flex;
		border-bottom: 1rpx solid #eef3f1;
	}

	.week-table__head {
		background: #0e9488;
	}

	.week-table__cell {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 12rpx 6rpx;
		text-align: center;
	}

	.week-table__corner {
		flex: 0 0 120rpx;
		color: #ffffff;
		font-size: 24rpx;
		font-weight: 600;
	}

	.week-table__day {
		color: #ffffff;
	}

	.week-table__day.is-today {
		background: #0a756b;
	}

	.week-table__day-name {
		font-size: 24rpx;
		font-weight: 600;
	}

	.week-table__day-date {
		font-size: 20rpx;
		opacity: 0.85;
		margin-top: 2rpx;
	}

	.week-table__slot {
		flex: 0 0 120rpx;
		background: #f0f7f5;
		border-right: 1rpx solid #eef3f1;
	}

	.week-table__slot-time {
		font-size: 22rpx;
		font-weight: 600;
		color: #0e9488;
		line-height: 1.3;
	}

	.week-table__body {
		align-items: stretch;
		justify-content: flex-start;
		padding: 8rpx 4rpx;
		gap: 8rpx;
		border-right: 1rpx solid #f2f6f4;
	}

	.week-table__body.is-today {
		background: #f5fbf9;
	}

	.schedule-item {
		background: #ffffff;
		border-radius: 12rpx;
		padding: 8rpx 6rpx;
		display: flex;
		flex-direction: column;
		gap: 4rpx;
		border-left: 6rpx solid #c6ded8;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	}

	.schedule-item.is-ok {
		border-left-color: #4eb3a6;
		background: #e9f7f3;
	}

	.schedule-item.is-wait {
		border-left-color: #e6a23c;
		background: #fdf6ec;
	}

	.schedule-item.is-no {
		border-left-color: #f56c6c;
		background: #fef0f0;
	}

	.schedule-item--empty {
		background: transparent;
		border-left-color: transparent;
		box-shadow: none;
		color: #d3e2dd;
		text-align: center;
	}

	.schedule-item__name {
		font-size: 21rpx;
		color: #2c4a44;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	.schedule-item__status {
		font-size: 18rpx;
		color: #7d9992;
	}

	.week-table__legend {
		display: flex;
		gap: 32rpx;
		padding: 20rpx 24rpx;
		background: #ffffff;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #6b8a82;
	}

	.legend-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
	}

	.legend-dot--ok {
		background: #4eb3a6;
	}

	.legend-dot--wait {
		background: #e6a23c;
	}

	/* 空状态 */
	.schedule-empty {
		background: #ffffff;
		border-radius: 24rpx;
		padding: 80rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
	}

	.schedule-empty__icon {
		font-size: 72rpx;
	}

	.schedule-empty__text {
		font-size: 30rpx;
		color: #2c4a44;
		font-weight: 600;
	}

	.schedule-empty__hint {
		font-size: 24rpx;
		color: #8aa39d;
		text-align: center;
	}

	/* 时段字典管理 */
	.slot-manage {
		margin-top: 40rpx;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 32rpx 24rpx;
	}

	.slot-manage__head {
		display: flex;
		flex-direction: column;
		margin-bottom: 24rpx;
	}

	.slot-manage__title {
		font-size: 32rpx;
		font-weight: 600;
		color: #1f3b37;
	}

	.slot-manage__tip {
		font-size: 22rpx;
		color: #8aa39d;
		margin-top: 6rpx;
	}

	.slot-manage__add {
		display: flex;
		gap: 16rpx;
		align-items: center;
		margin-bottom: 24rpx;
	}

	.slot-manage__input {
		flex: 1;
		height: 72rpx;
		line-height: 72rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #2c4a44;
		background: #f0f7f5;
		border-radius: 12rpx;
	}

	.slot-manage__btn {
		margin: 0;
		height: 72rpx;
		line-height: 72rpx;
		padding: 0 32rpx;
		font-size: 28rpx;
		color: #ffffff;
		background: linear-gradient(126deg, #4eb3a6 3%, #0e9488 97%);
		border-radius: 12rpx;
	}

	.slot-manage__empty {
		font-size: 24rpx;
		color: #8aa39d;
		text-align: center;
		padding: 24rpx 0;
	}

	.slot-chip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 8rpx;
		border-bottom: 1rpx solid #f0f4f2;
	}

	.slot-chip__text {
		font-size: 28rpx;
		color: #2c4a44;
		font-weight: 500;
	}

	.slot-chip__ops {
		display: flex;
		gap: 24rpx;
	}

	.slot-chip__op {
		font-size: 24rpx;
	}

	.slot-chip__op--edit {
		color: #42a5f9;
	}

	.slot-chip__op--del {
		color: #f56c6c;
	}
</style>