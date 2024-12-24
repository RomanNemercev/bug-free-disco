import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: {}, // Объект вида { id: { count, rateId } }
    cardsData: [],
  }),
  getters: {
    totalSum(state) {
      return Object.entries(state.cartItems).reduce(
        (sum, [id, { count, rateId }]) => {
          const card = state.cardsData.find(card => card.id === id)
          if (!card) return sum // Пропускаем, если карточка не найдена
          const rate = ratesData.find(rate => rate.id === rateId) // Найди тариф
          return sum + (rate ? count * rate.price : 0) // Используем свойство price
        },
        0
      )
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
      } else {
        delete this.cartItems[id]
      }
    },
    deleteItem(id) {
      delete this.cartItems[id]
    },
    setRate(id, rateId) {
      if (this.cartItems[id]) {
        this.cartItems[id].rateId = rateId
      }
    },
    isInCart(id) {
      return !!this.cartItems[id]
    },
    setCardsData(cards) {
      this.cardsData = cards
    },
  },
})

function parsePrice(rateTitle) {
  const match = rateTitle.match(/\d+(\s\d+)*(?=\s₽)/g) // Извлекаем цену из строки
  return match ? parseInt(match[0].replace(/\s/g, ''), 10) : 0
}
