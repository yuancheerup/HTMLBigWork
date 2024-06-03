import { defineStore } from 'pinia'

export const useDrinkStore = defineStore('drink', {
  state: () => ({
    drinks: JSON.parse(localStorage.getItem('drinks') || '[]'),
    target: JSON.parse(localStorage.getItem('target') || '2000') // 默认目标2000ml
  }),
  getters: {
    totalDrunk: (state) =>
      state.drinks.reduce((total, drink) => total + drink.amount, 0),
    todayDrinks: (state) =>
      state.drinks.filter((drink) => {
        const today = new Date().toISOString().slice(0, 10)
        return drink.date === today
      }),
    todayTotal: (state) =>
      state.todayDrinks.reduce((total, drink) => total + drink.amount, 0),
    todayCount: (state) => state.todayDrinks.length
  },
  actions: {
    addDrink(drink) {
      this.drinks.push(drink)
      localStorage.setItem('drinks', JSON.stringify(this.drinks))
    },
    setTarget(target) {
      this.target = target
      localStorage.setItem('target', JSON.stringify(target))
    }
  }
})
