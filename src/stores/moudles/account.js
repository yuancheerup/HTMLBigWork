import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore(
  'account',
  () => {
    const totalExpend = ref(0)
    const totalIncome = ref(0)

    const bills = ref([])

    // 添加
    const addBill = ({ type, money, date, name }) => {
      bills.value.push({
        type: type,
        money: money,
        date: date,
        name: name
      })
    }

    return {
      totalExpend,
      totalIncome,
      bills,
      addBill
    }
  },
  {
    persist: true
  }
)
