import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // Список ID товаров в корзине
  }),
  actions: {
    toggleItem(id) {
      if (this.cartItems.includes(id)) {
        this.cartItems = this.cartItems.filter(item => item !== id) // Исправлено item !== id
      } else {
        this.cartItems.push(id)
      }
    },
    isInCart(id) {
      return this.cartItems.includes(id) // Проверка, есть ли элемент в корзине
    },
  },
})
