import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScheduleStore = defineStore(
  'schedule',
  () => {
    const schedule = ref([])
    const id = ref(0)
    const editId = ref(null)

    const addSchedule = ({ start, end, title }) => {
      schedule.value.push({
        id: id.value++,
        start: start,
        end: end,
        title: title
      })
    }

    // 根据id修改
    const updateSchedule = ({ id, start, end, title }) => {
      const index = schedule.value.findIndex((item) => item.id === id)
      schedule.value[index].title = title
      schedule.value[index].start = start
      schedule.value[index].end = end
    }

    // 删除日程
    const removeSchedule = (id) => {
      schedule.value = schedule.value.filter((item) => item.id !== id)
    }

    return {
      schedule,
      addSchedule,
      updateSchedule,
      removeSchedule,
      editId
    }
  },
  {
    persist: true
  }
)
