import { defineStore } from 'pinia'
import cardsData from '~/src/data/cards-data.json'
import ratesData from '~/src/data/rates-data.json'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: {}, // Объект вида { id: { count, rateId } }
    cardsData: [],
    ratesData: [],
  }),
  getters: {
    totalSum(state) {
      return Object.entries(state.cartItems).reduce(
        (sum, [id, { count, rateId }]) => {
          const card = state.cardsData.find(card => card.id === id)
          if (!card) return sum // Пропускаем, если карточка не найдена
          const rate = state.ratesData.find(rate => rate.id === rateId) // Используем state.ratesData
          return sum + (rate ? count * rate.price : 0) // Используем свойство price
        },
        0
      )
    },
    totalItems(state) {
      return Object.values(state.cartItems).reduce(
        (total, { count }) => total + count,
        0
      )
    },
    isRemoveDisabled: state => id => {
      return state.cartItems[id]?.count <= 1 // Кнопка отключается при count <= 1
    },
  },
  actions: {
    addItem(id, rateId) {
      if (this.cartItems[id]) {
        this.cartItems[id].count++
      } else {
        this.cartItems[id] = { count: 1, rateId }
      }
    },
    removeItem(id) {
      if (this.cartItems[id]?.count > 1) {
        this.cartItems[id].count--
      }
    },
    deleteItem(id) {
      delete this.cartItems[id]
    },
    isInCart(id) {
      return !!this.cartItems[id]
    },
    setCardsData(cards) {
      this.cardsData = cards
    },
    setRatesData(rates) {
      this.ratesData = rates // Метод для инициализации ratesData
    },
  },
})
