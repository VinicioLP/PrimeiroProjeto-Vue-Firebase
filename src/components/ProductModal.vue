<template>
  <Transition name="fade">
    <div v-if="product" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <button class="close-btn" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div class="modal-content">
          <div class="product-image-section">
            <img :src="product.image" :alt="product.name" />
          </div>

          <div class="product-info-section">
            <div class="product-header">
              <span class="product-category-tag">{{ product.category }}</span>
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
            </div>

            <div class="product-details">
              <h4>Descrição</h4>
              <p class="product-description">{{ product.description }}</p>
            </div>

            <div class="product-features">
              <div class="feature">
                <span class="feature-label">Material</span>
                <span class="feature-value">100% Algodão Premium</span>
              </div>
              <div class="feature">
                <span class="feature-label">Modelagem</span>
                <span class="feature-value">Oversized Streetwear</span>
              </div>
            </div>

            <div class="product-actions">
              <button class="btn btn-primary full-width" @click="$emit('add-to-cart', product)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "ProductModal",
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ["close", "add-to-cart"],
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-container {
  background: var(--surface);
  width: min(900px, 100%);
  max-height: 90vh;
  border-radius: 24px;
  position: relative;
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.product-image-section {
  background: var(--surface-soft);
  height: 100%;
}

.product-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info-section {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.product-category-tag {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--muted);
  margin-bottom: 0.5rem;
  display: block;
}

.product-name {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
}

.product-details {
  margin-bottom: 2rem;
}

.product-details h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.product-description {
  line-height: 1.7;
  color: var(--muted);
  font-size: 0.95rem;
}

.product-features {
  display: grid;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--surface-soft);
  border-radius: 16px;
  border: 1px solid var(--border);
}

.feature {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.feature-label {
  color: var(--muted);
  font-weight: 600;
}

.feature-value {
  color: #fff;
  font-weight: 700;
}

.product-actions {
  margin-top: auto;
}

.full-width {
  width: 100%;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr;
  }
  .product-image-section {
    height: 300px;
  }
  .product-info-section {
    padding: 2rem;
  }
  .product-name {
    font-size: 1.75rem;
  }
}
</style>
