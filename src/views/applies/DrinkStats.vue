<template>
  <div
    ref="myChart"
    id="myChart"
    :style="{ width: '375px', height: '400px' }"
  ></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useDrinkStore } from '@/stores/waterStore'

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance = getCurrentInstance()
let echarts = internalInstance.appContext.config.globalProperties.$echarts
const drinkStore = useDrinkStore()
const target = ref(drinkStore.drinks)

onMounted(() => {
  const dom = document.getElementById('myChart')
  const myChart = echarts.init(dom, null, {
    width: 365,
    height: 400
  }) // 初始化echarts实例
  const option = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        data: [1150, 1500, 2350, 1820, 3520, 1200, 3050]
      }
    ]
  }
  // 设置实例参数
  myChart.setOption(option)
  console.log(target.value)
})
</script>
