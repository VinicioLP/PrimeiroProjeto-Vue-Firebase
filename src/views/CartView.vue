<template>
  <div class="cart-view">
    <div class="container container-narrow">
      <div class="cart-header">
        <h1 class="cart-title">Seu Carrinho</h1>
        <p class="cart-subtitle">
          {{ cartStore.cartCount }} itens selecionados
        </p>
      </div>

      <div v-if="cartStore.items.length === 0" class="cart-empty">
        <div class="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2>Seu carrinho está vazio</h2>
        <p>Explore nossa coleção e encontre algo incrível para você.</p>
        <router-link to="/" class="btn btn-primary"
          >Voltar às Compras</router-link
        >
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-category">{{ item.category }}</p>
              <div class="item-price">R$ {{ item.price.toFixed(2) }}</div>
            </div>
            <div class="item-actions">
              <div class="quantity-controls">
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <button class="remove-btn" @click="cartStore.removeItem(item.id)">
                Remover
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary card">
          <h3>Resumo do Pedido</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>R$ {{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Frete</span>
            <span class="free">Grátis</span>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span>R$ {{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn" @click="checkout">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore.js";
import { useAuthStore } from "../stores/authStore.js";
import { useRouter } from "vue-router";

export default {
  name: "CartView",
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const isLoggedIn = computed(() => authStore.isAuthenticated);

    const checkout = () => {
      if (!isLoggedIn.value) {
        router.push({ name: "Login", query: { redirect: "/cart" } });
        return;
      }

      alert("Integração de checkout será implementada em breve!");
      cartStore.clearCart();
      router.push("/dashboard");
    };

    return {
      cartStore,
      checkout,
    };
  },
};
</script>

<style scoped>
.cart-view {
  min-height: 100vh;
  padding: 4rem 1rem;
  background: var(--bg);
}

.container-narrow {
  max-width: 900px;
}

.cart-header {
  margin-bottom: 3rem;
  text-align: center;
}

.cart-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.cart-subtitle {
  color: var(--muted);
  font-size: 1.1rem;
}

.cart-empty {
  text-align: center;
  padding: 5rem 2rem;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.cart-empty h2 {
  margin-bottom: 1rem;
}

.cart-empty p {
  margin-bottom: 2rem;
  color: var(--muted);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--surface);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.item-image {
  width: 100px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
}

.item-category {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.item-price {
  font-weight: 700;
  font-size: 1.1rem;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface-soft);
  padding: 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--border);
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid var(--border);
}

.remove-btn {
  background: transparent;
  color: var(--accent-red);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
}

.cart-summary {
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
}

.cart-summary h3 {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--muted);
}

.free {
  color: #4cd137;
  font-weight: 700;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 1.25rem;
  font-weight: 800;
}

.checkout-btn {
  width: 100%;
  padding: 1.25rem;
  background: var(--text);
  color: var(--bg);
  border-radius: 999px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: var(--transition);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  filter: brightness(0.9);
}

@media (max-width: 850px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
