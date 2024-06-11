import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMemoryStore = defineStore(
  'memory',
  () => {
    // const holidayName = ref('')
    // const holidayDate = ref([])
    // const repeat = ref(false)
    const holidays = ref([])

    const addHoliday = ({ holidayName, holidayDate, repeat, day }) => {
      holidays.value.push({
        name: holidayName,
        date: holidayDate,
        repeat: repeat,
        day: day
      })
    }

    return {
      // holidayName,
      // holidayDate,
      // repeat,
      holidays,
      addHoliday
    }
  },
  {
    persist: true
  }
)
