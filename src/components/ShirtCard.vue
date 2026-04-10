<template>
  <div class="shirt-card card">
    <div class="shirt-image-container" @click="$emit('view-details', shirt)">
      <img :src="shirt.image" :alt="shirt.name" class="shirt-image" />
      <div class="shirt-overlay">
        <span class="overlay-text">Ver Detalhes</span>
      </div>
    </div>

    <div class="shirt-content">
      <h3 class="shirt-name" @click="$emit('view-details', shirt)">{{ shirt.name }}</h3>
      <p class="shirt-description">{{ shirt.description }}</p>

      <div class="shirt-meta">
        <span class="shirt-price">R$ {{ shirt.price.toFixed(2) }}</span>
        <span class="shirt-category">{{ shirt.category }}</span>
      </div>

      <div class="shirt-actions">
        <button class="btn btn-cart" @click.stop="$emit('add-to-cart', shirt)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cart-icon"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShirtCard",
  props: {
    shirt: {
      type: Object,
      required: true,
    },
  },
  emits: ["add-to-cart", "view-details"],
};
</script>

<style scoped>
.cart-icon {
  margin-right: 0.5rem;
}

.shirt-card {
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  cursor: pointer;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.shirt-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
}

.shirt-image-container {
  position: relative;
  overflow: hidden;
  height: 280px;
  background: var(--surface-soft);
}

.shirt-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.shirt-card:hover .shirt-image {
  transform: scale(1.07);
}

.shirt-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    transparent 50%
  );
  opacity: 0;
  transition: var(--transition);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.5rem;
}

.shirt-card:hover .shirt-overlay {
  opacity: 1;
}

.overlay-text {
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(20, 20, 20, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.shirt-content {
  padding: 1.5rem;
}

.shirt-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shirt-description {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 1.25rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shirt-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.shirt-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.shirt-category {
  font-size: 0.65rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
}

.shirt-actions {
  display: flex;
}

.shirt-actions .btn {
  flex: 1;
  padding: 0.85rem 1rem;
  font-size: 0.8rem;
  border-radius: 12px;
}

.btn-cart {
  background: var(--accent);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cart:hover {
  background: var(--accent-dark);
}

@media (max-width: 768px) {
  .shirt-image-container {
    height: 240px;
  }

  .shirt-content {
    padding: 1.25rem;
  }

  .shirt-name {
    font-size: 1.15rem;
  }

  .shirt-price {
    font-size: 1.25rem;
  }

  .shirt-actions {
    flex-direction: column;
  }

  .shirt-actions .btn {
    width: 100%;
  }
}
</style>
