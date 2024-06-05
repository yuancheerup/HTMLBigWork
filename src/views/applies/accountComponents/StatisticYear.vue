<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { useAccountStore } from '@/stores'

const accountStore = useAccountStore()

// 日期选择弹层
const showBottom = ref(false)
const showBottomPopup = () => {
  showBottom.value = true
}

// 日期选择
const currentDate = ref([new Date().getFullYear()])
const minDate = ref(new Date(new Date().getFullYear() - 30, 0))
const maxDate = ref(new Date(new Date().getFullYear() + 30, 0))
const columnsType = ['year']
const onClickConfirm = () => {
  showBottom.value = false
}
const onClickCancel = () => {
  showBottom.value = false
}

// 获取账单数据
const contentBill = ref(accountStore.bills)
// 按日期分组账单
const groupedBills = computed(() => {
  return contentBill.value.reduce((acc, bill) => {
    const date = bill.date.join('-').slice(0, 4)
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(bill)
    console.log('acc: ', acc)
    return acc
  }, {})
})

// 选择当前年的所有账单
const currentYearBills = computed(() => {
  const currentYearDate = currentDate.value
  console.log('currentYearBills: ', groupedBills.value[currentYearDate])
  return groupedBills.value[currentYearDate] || []
})

// 计算年支出
const yearTotalExpend = computed(() => {
  return currentYearBills.value.reduce((acc, bill) => {
    if (bill.type === 'expend') {
      return acc + parseFloat(bill.money)
    } else {
      return acc
    }
  }, 0)
})

// 计算年收入
const yearTotalIncome = computed(() => {
  return currentYearBills.value.reduce((acc, bill) => {
    if (bill.type === 'income') {
      return acc + parseFloat(bill.money)
    } else {
      return acc
    }
  }, 0)
})

//计算年余额
const yearBalance = computed(() => {
  return yearTotalIncome.value - yearTotalExpend.value
})

// 计算支出或收入账单
const calculateBills = (type) => {
  return currentYearBills.value.reduce((acc, bill) => {
    if (bill.type === type) {
      const key = `${type}-${bill.name}`
      if (!acc[key]) {
        acc[key] = {
          money: parseFloat(bill.money),
          name: bill.name,
          icon: bill.icon
        }
      } else {
        acc[key].money += parseFloat(bill.money)
      }
    }
    return acc
  }, {})
}

// 计算支出账单
const expendBills = computed(() => calculateBills('expend'))

// 计算收入账单
const incomeBills = computed(() => calculateBills('income'))

// 控制饼图的btn
const btnActive = ref('expend')

// 图表的生成
const chart = ref(null)
let myChart = null // 声明一个变量用于存储图表实例

// 更新图表数据
const updateData = (data) => {
  return Object.values(data).map((item) => ({
    value: item.money,
    name: item.name
  }))
}

// 监视btnActive（支出、收入按钮）和日期的变化
watch([btnActive, currentDate], () => {
  // 更新图表数据
  const options = {
    series: [
      {
        data:
          btnActive.value === 'expend'
            ? updateData(expendBills.value)
            : updateData(incomeBills.value)
      }
    ]
  }
  myChart.setOption(options)
})

onMounted(() => {
  // 在下一个tick中执行初始化操作
  nextTick(() => {
    // 初始化图表
    myChart = echarts.init(chart.value)
    const options = {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data:
            btnActive.value === 'expend'
              ? updateData(expendBills.value)
              : updateData(incomeBills.value),
          label: {
            show: true, // 确保显示标签
            formatter: '{b}: {c}' // 标签格式为 "name: value"
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    // 图表自适应
    const resizeHandler = () => {
      myChart.resize()
    }
    window.addEventListener('resize', resizeHandler)

    // 配置图表
    myChart.setOption(options)
  })
})
</script>

<template>
  <div class="header">
    <div class="header-time">
      <span @click="showBottomPopup">
        <van-icon name="arrow-left" />
        {{ currentDate[0] }}年
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="header-money">
      <div class="header-total">
        <span>年收入</span>
        <span class="header-total-money">{{ yearTotalIncome.toFixed(2) }}</span>
      </div>
      <div class="header-total">
        <span>年支出</span>
        <span class="header-total-money">{{ yearTotalExpend.toFixed(2) }}</span>
      </div>
      <div class="header-total">
        <span>年结余</span>
        <span class="header-total-money">{{ yearBalance.toFixed(2) }}</span>
      </div>
    </div>
  </div>

  <div class="echarts-content">
    <div class="echarts-content-header">
      <div class="title">
        <span>分类统计</span>
      </div>
      <div class="btns">
        <span
          :class="btnActive === 'expend' ? 'active' : ''"
          @click="btnActive = 'expend'"
          >支出</span
        >
        <span
          :class="btnActive === 'income' ? 'active' : ''"
          @click="btnActive = 'income'"
          >收入</span
        >
      </div>
    </div>

    <!-- 饼图 -->
    <div class="echarts" ref="chart"></div>

    <!-- 各主分明细 -->
    <div class="echarts-details">
      <div
        v-for="item in btnActive === 'expend' ? expendBills : incomeBills"
        :key="item.name"
        class="echarts-details-item"
      >
        <div class="echarts-details-item-icon">
          <span :class="item.icon" class="iconfont"></span>
        </div>
        <div class="echarts-details-content">
          <div class="echarts-details-item-text">
            <div class="echarts-details-item-name">{{ item.name }}</div>
            <div class="echarts-details-item-money">{{ item.money }}</div>
          </div>

          <div class="echarts-details-item-percentage">
            <van-progress
              :percentage="
                btnActive === 'expend'
                  ? ((item.money / yearTotalExpend) * 100).toFixed(2)
                  : ((item.money / yearTotalIncome) * 100).toFixed(2)
              "
              color="#3eb575"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    {{
      btnActive === 'expend' ? updateData(expendBills) : updateData(incomeBills)
    }}
  </div> -->
  <!-- 日期弹出 -->
  <van-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <van-date-picker
      v-model="currentDate"
      title="选择年"
      :min-date="minDate"
      :max-date="maxDate"
      :columns-type="columnsType"
      @confirm="onClickConfirm"
      @cancel="onClickCancel"
    />
  </van-popup>
</template>

<style scoped>
.header {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  .header-time {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 16px;
    color: #333;
  }
  .header-money {
    display: flex;
    justify-content: space-between;
    .header-total {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px;
      span {
        margin-bottom: 10px;
        font-size: 14px;
        color: #999;
      }
      .header-total-money {
        font-size: 18px;
        color: #333;
      }
    }
  }
}

.echarts-content {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;

  .echarts-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 16px;
      color: #333;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #999;
      background-color: #f7f7f7;
      border-radius: 15px;

      span {
        padding: 5px 10px;
      }

      .active {
        background-color: #3eb575;
        border-radius: 15px;
        color: #fff;
      }
    }
  }

  .echarts {
    width: 100%;
    height: 300px; /* 确保图表有明确的高度 */
  }

  .echarts-details {
    .echarts-details-item {
      display: flex;
      justify-content: flex-start;

      .echarts-details-item-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        padding: 5px;
        border-radius: 50%;
        background-color: #3eb575;
        .iconfont {
          font-size: 30px;
          color: #fff;
        }
      }

      .echarts-details-content {
        width: 80%;
        .echarts-details-item-text {
          display: flex;
          justify-content: space-between;
          margin: 3.5% 0;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
