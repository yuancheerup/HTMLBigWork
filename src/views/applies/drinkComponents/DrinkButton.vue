<template>
  <van-popup v-model:show="showPopup" position="bottom">
    <van-picker
      show-toolbar
      title="选择饮品和饮用量"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="showPopup = false"
    />
  </van-popup>
  <van-button
    class="drink-button"
    type="primary"
    icon="plus"
    round
    @click="showPopup = true"
    >喝水</van-button
  >
</template>

<script setup>
import { ref } from 'vue'
import { useDrinkStore } from '@/stores/waterStore'

const showPopup = ref(false)
const drinkStore = useDrinkStore()

const mlOptions = [
  { text: '100ml', value: 100 },
  { text: '200ml', value: 200 },
  { text: '250ml', value: 250 },
  { text: '500ml', value: 500 }
]

const columns = [
  {
    text: '水',
    value: 'water',
    children: [...mlOptions, { text: '自定义', value: 'custom_water' }]
  },
  {
    text: '酸奶',
    value: 'yogurt',
    children: [...mlOptions, { text: '自定义', value: 'custom_yogurt' }]
  },
  {
    text: '咖啡',
    value: 'coffee',
    children: [...mlOptions, { text: '自定义', value: 'custom_coffee' }]
  },
  {
    text: '牛奶',
    value: 'milk',
    children: [...mlOptions, { text: '自定义', value: 'custom_milk' }]
  },
  {
    text: '果汁',
    value: 'juice',
    children: [...mlOptions, { text: '自定义', value: 'custom_juice' }]
  },
  {
    text: '茶',
    value: 'tea',
    children: [...mlOptions, { text: '自定义', value: 'custom_tea' }]
  },
  {
    text: '碳酸饮料',
    value: 'soda',
    children: [...mlOptions, { text: '自定义', value: 'custom_soda' }]
  }
]

const onConfirm = ({ selectedOptions }) => {
  const type = selectedOptions[0].value // 饮品类别
  const amount = selectedOptions[1].value // 饮用量

  drinkStore.addDrink({
    type,
    amount: parseInt(amount),
    date: new Date().toISOString().slice(0, 10)
  })
  showPopup.value = false
}
</script>

<style scoped>
.drink-button {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
