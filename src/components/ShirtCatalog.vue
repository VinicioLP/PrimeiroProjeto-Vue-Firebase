<template>
  <div class="shirt-catalog">
    <div class="container">
      <div v-if="showHeader" class="catalog-header">
        <h2 class="catalog-title">{{ catalogTitle }}</h2>
        <p class="catalog-subtitle">
          Descubra nossa coleção exclusiva de streetwear premium
        </p>
      </div>

      <div v-if="!featuredOnly" class="catalog-filters">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        Carregando produtos...
      </div>

      <div v-else-if="error" class="error">
        <div class="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3>Erro ao carregar produtos</h3>
        <p>{{ error }}</p>
        <button class="btn btn-secondary" @click="retry">
          Tentar Novamente
        </button>
      </div>

      <div v-else-if="shirts.length === 0" class="catalog-empty">
        <div class="catalog-empty-icon">
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
        <h3>Nenhum produto encontrado</h3>
        <p>Não há produtos disponíveis no momento.</p>
      </div>

      <div v-else class="catalog-grid">
        <ShirtCard
          v-for="shirt in shirts"
          :key="shirt.id"
          :shirt="shirt"
          @add-to-cart="addToCart"
          @view-details="openModal"
        />
      </div>
    </div>

    <!-- Product Details Modal -->
    <ProductModal
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="handleAddToCartFromModal"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ShirtCard from "./ShirtCard.vue";
import ProductModal from "./ProductModal.vue";
import { useShirtStore } from "../stores/shirtStore.js";
import { useCartStore } from "../stores/cartStore.js";

export default {
  name: "ShirtCatalog",
  components: {
    ShirtCard,
    ProductModal,
  },
  props: {
    featuredOnly: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const shirtStore = useShirtStore();
    const cartStore = useCartStore();
    const selectedCategory = ref("Todos");
    const selectedProduct = ref(null);

    const baseShirts = computed(() => {
      return props.featuredOnly
        ? shirtStore.shirts.filter((shirt) => shirt.featured)
        : shirtStore.shirts;
    });

    const filteredShirts = computed(() => {
      if (selectedCategory.value === "Todos") {
        return baseShirts.value;
      }
      return baseShirts.value.filter(
        (shirt) => shirt.category === selectedCategory.value,
      );
    });

    const categories = ["Todos", "Basic", "Graphic", "Hoodie"];

    const catalogTitle = computed(() => {
      return props.featuredOnly
        ? "Camisetas em Destaque"
        : "Catálogo de Camisetas";
    });

    const addToCart = (shirt) => {
      cartStore.addItem(shirt);
    };

    const handleAddToCartFromModal = (shirt) => {
      addToCart(shirt);
      closeModal();
    };

    const openModal = (shirt) => {
      selectedProduct.value = shirt;
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      selectedProduct.value = null;
      document.body.style.overflow = "auto";
    };

    const retry = () => {
      shirtStore.fetchShirts();
    };

    return {
      shirts: filteredShirts,
      selectedCategory,
      selectedProduct,
      categories,
      catalogTitle,
      loading: computed(() => shirtStore.loading),
      error: computed(() => shirtStore.error),
      addToCart,
      handleAddToCartFromModal,
      openModal,
      closeModal,
      retry,
      featuredOnly: props.featuredOnly,
      showHeader: props.showHeader,
    };
  },
  mounted() {
    const shirtStore = useShirtStore();
    shirtStore.fetchShirts();
  },
};
</script>

<style scoped>
.shirt-catalog {
  padding: 2rem 0;
}

.catalog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.catalog-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.catalog-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 64px;
  height: 4px;
  background: var(--accent);
  transform: translateX(-50%);
  border-radius: 999px;
}

.catalog-subtitle {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.catalog-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--muted);
}

.catalog-empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.catalog-empty h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.catalog-empty p {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.catalog-filters {
  display: flex;
  justify-content: center;
  gap: 0.85rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.65rem 1rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover,
.filter-btn.active {
  border-color: var(--accent);
  background: var(--accent);
  color: #000;
}

@media (max-width: 768px) {
  .shirt-catalog {
    padding: 1rem 0;
  }

  .catalog-header {
    margin-bottom: 2rem;
  }

  .catalog-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .catalog-filters {
    gap: 0.75rem;
  }

  .filter-btn {
    padding: 0.6rem 0.9rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .catalog-grid {
    grid-template-columns: 1fr;
  }

  .catalog-filters {
    flex-direction: column;
    align-items: center;
  }
}
</style>
