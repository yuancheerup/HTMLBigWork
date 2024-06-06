<template>
  <div
    ref="myChart"
    id="myChart"
    :style="{ width: '375px', height: '400px' }"
  ></div>
  <div class="box-container">
    <div class="box" v-for="(box, index) in boxes" :key="index">
      <!-- 在这里放置你的文字和数字 -->
      <p>{{ box.text }}</p>
      <p class="bold-number">{{ box.number }} ml</p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useDrinkStore } from '@/stores/waterStore'
import { computed } from 'vue'

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance = getCurrentInstance()
let echarts = internalInstance.appContext.config.globalProperties.$echarts
const drinkStore = useDrinkStore()
const target = ref(drinkStore.drinks)

const boxes = computed(() => {
  return [
    {
      text: '今日喝水量',
      number: target.value.reduce((acc, cur) => acc + cur.amount, 0)
    },
    {
      text: '今日目标喝水量',
      number: drinkStore.target
    },
    {
      text: '七日平均',
      number: Math.round(
        (target.value.reduce((acc, cur) => acc + cur.amount, 0) + 12740) / 7
      )
    },
    {
      text: '剩余量',
      number:
        drinkStore.target -
        target.value.reduce((acc, cur) => acc + cur.amount, 0)
    }
  ]
})

function getDateBeforeNDays(N) {
  const tempDate = new Date() // 获取今天的日期
  tempDate.setDate(tempDate.getDate() - N) // 今天的前N天的日期

  const month = String(tempDate.getMonth() + 1) // 补零
  const day = String(tempDate.getDate()).padStart(2, '0') // 补零

  const endDate = `${month}-${day}`
  return endDate
}

onMounted(() => {
  // 基于准备好的dom，初始化echarts实
  const totalDrunk = computed(() => drinkStore.totalDrunk)
  const dom = document.getElementById('myChart')
  const myChart = echarts.init(dom, null, {
    width: 365,
    height: 400
  }) // 初始化echarts实例
  const option = {
    xAxis: {
      data: [
        getDateBeforeNDays(6),
        getDateBeforeNDays(5),
        getDateBeforeNDays(4),
        getDateBeforeNDays(3),
        getDateBeforeNDays(2),
        getDateBeforeNDays(1),
        getDateBeforeNDays(0)
      ]
    },
    yAxis: {
      type: 'value',
      name: '毫升/ml',
      min: 0,
      max: 5000,
      position: 'left',
      axisLabel: {
        align: 'center'
      }
    },
    grid: {
      show: false,
      top: '10%',
      right: '5%',
      bottom: '40%',
      left: '10%'
    },
    series: [
      {
        name: '温度',
        type: 'bar',
        barWidth: '40%',
        barGap: '10%',
        data: [1150, 1500, 2350, 1820, 3520, 2400, totalDrunk.value]
      }
    ]
  }
  // 设置实例参数
  myChart.setOption(option)
  console.log(target.value)
})
</script>

<style scoped>
.box-container {
  position: relative;
  bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* 或者其他你想要的水平对齐方式 */
}

.box {
  background-color: #fff; /* 白底 */
  border-radius: 10px; /* 圆角 */
  padding: 15px; /* 内边距，根据需要调整 */
  margin: 10px; /* 外边距，根据需要调整 */
  width: calc(50% - 20px); /* 宽度为容器的一半减去外边距 */
  box-sizing: border-box; /* 包含padding和border在宽度内 */
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.bold-number {
  font-weight: bold; /* 数字加粗 */
}
</style>
