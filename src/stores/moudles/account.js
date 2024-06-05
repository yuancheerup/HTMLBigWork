import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore(
  'account',
  () => {
    const bills = ref([])

    const totalExpend = computed(() => {
      return bills.value
        .filter((item) => item.type === 'expend')
        .reduce((pre, cur) => pre + parseFloat(cur.money), 0)
        .toFixed(2)
    })
    const totalIncome = computed(() => {
      return bills.value
        .filter((item) => item.type === 'income')
        .reduce((pre, cur) => pre + parseFloat(cur.money), 0)
        .toFixed(2)
    })
    const balance = computed(() => {
      return (totalIncome.value - totalExpend.value).toFixed(2)
    })
    // 添加
    const addBill = ({ type, money, date, icon, name }) => {
      bills.value.push({
        type: type,
        money: money,
        date: date,
        icon: icon,
        name: name
      })
    }

    return {
      totalExpend,
      totalIncome,
      balance,
      bills,
      addBill
    }
  },
  {
    persist: true
  }
)
