import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  getters: {
    cartCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
  },

  actions: {
    addItem(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },

    clearCart() {
      this.items = [];
    },
  },
});
