import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMemoryStore = defineStore(
  'memory',
  () => {
    const holidays = ref([])
    const id = ref(0)
    const editId = ref(null)

    // 添加
    const addHoliday = ({ holidayName, holidayDate, repeat, day }) => {
      holidays.value.push({
        id: id.value++, // 自动生成id
        name: holidayName,
        date: holidayDate,
        repeat: repeat,
        day: day
      })
    }

    // 修改
    const updateHoliday = ({ id, holidayName, holidayDate, repeat, day }) => {
      const index = holidays.value.findIndex((item) => item.id === id)
      holidays.value[index] = {
        id: index, // 保持id不变
        name: holidayName,
        date: holidayDate,
        repeat: repeat,
        day: day
      }
    }

    // 删除
    const deleteHoliday = (id) => {
      holidays.value = holidays.value.filter((item) => item.id !== id)
    }

    return {
      id,
      editId,
      holidays,
      addHoliday,
      updateHoliday,
      deleteHoliday
    }
  },
  {
    persist: true
  }
)
