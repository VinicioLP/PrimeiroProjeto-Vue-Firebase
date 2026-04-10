<template>
  <div class="admin-view">
    <div class="background-decor">
      <div class="glow-1"></div>
      <div class="glow-2"></div>
    </div>

    <div class="container admin-container">
      <div class="admin-header">
        <div class="admin-badge">Management Console</div>
        <h1 class="admin-title">Painel Admin</h1>
        <p class="admin-subtitle">
          Controle total sobre o inventário e a curadoria da loja.
        </p>
      </div>

      <div class="admin-actions">
        <button class="action-btn" :class="{ active: showForm }" @click="showForm = !showForm">
          <span class="btn-icon">
            <svg v-if="!showForm" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
          {{ showForm ? "Fechar Editor" : "Novo Produto" }}
        </button>
        <button class="action-btn secondary" @click="populateProducts">
          <span class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>
          </span>
          Restaurar Catálogo
        </button>
      </div>

      <Transition name="expand">
        <div v-if="showForm" class="product-form-card">
          <div class="form-header">
            <h3>{{ editing ? "Editando Produto" : "Criar Novo Item" }}</h3>
            <p>{{ editing ? `ID: ${editing}` : "Preencha os detalhes abaixo" }}</p>
          </div>
          
          <form class="admin-form" @submit.prevent="handleSubmit">
            <div class="form-grid">
              <div class="form-group">
                <label for="name">Nome do Produto</label>
                <input id="name" v-model="form.name" class="form-input" placeholder="Ex: Black Oversized Hoodie" required />
              </div>
              
              <div class="form-group">
                <label for="price">Preço (R$)</label>
                <input id="price" v-model.number="form.price" type="number" step="0.01" class="form-input" placeholder="0.00" required />
              </div>

              <div class="form-group">
                <label for="category">Categoria</label>
                <select id="category" v-model="form.category" class="form-input form-select" required>
                  <option value="" disabled>Selecione</option>
                  <option value="Basic">Basic</option>
                  <option value="Graphic">Graphic</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Streetwear">Streetwear</option>
                </select>
              </div>

              <div class="form-group">
                <label for="stock">Estoque</label>
                <input id="stock" v-model.number="form.stock" type="number" class="form-input" placeholder="0" required />
              </div>

              <div class="form-group full-width">
                <label for="description">Descrição do Item</label>
                <textarea id="description" v-model="form.description" class="form-input form-textarea" placeholder="Descreva os materiais, corte e detalhes..." required></textarea>
              </div>

              <div class="form-group full-width">
                <label for="image">URL da Imagem</label>
                <input id="image" v-model="form.image" class="form-input" placeholder="https://exemplo.com/imagem.png" required />
              </div>

              <div class="form-group full-width">
                <label>Tamanhos Disponíveis</label>
                <div class="sizes-grid">
                  <label v-for="size in availableSizes" :key="size" class="size-checkbox" :class="{ selected: form.sizes.includes(size) }">
                    <input type="checkbox" :value="size" v-model="form.sizes" />
                    <span>{{ size }}</span>
                  </label>
                </div>
              </div>

              <div class="form-group full-width">
                <label class="featured-toggle">
                  <input type="checkbox" v-model="form.featured" />
                  <span class="toggle-text">Destaque na Página Inicial</span>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="spinner"></span>
                {{ loading ? "SALVANDO..." : (editing ? "ATUALIZAR PRODUTO" : "CADASTRAR PRODUTO") }}
              </button>
              <button v-if="editing" type="button" class="cancel-btn" @click="resetForm">
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      </Transition>

      <div class="products-section">
        <div class="section-header">
          <h2 class="section-title">Coleção Atual</h2>
          <div class="count-badge">{{ shirts.length }} Itens</div>
        </div>

        <div v-if="loading && !shirts.length" class="loading-state">
           <span class="spinner large"></span>
           <p>Carregando inventário...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <span class="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </span>
          <p>{{ error }}</p>
        </div>

        <div v-else class="admin-products-grid">
          <div v-for="shirt in shirts" :key="shirt.id" class="admin-product-card">
            <div class="product-preview">
              <img :src="shirt.image" :alt="shirt.name" />
              <div class="product-badges">
                <span class="category-badge">{{ shirt.category }}</span>
                <span v-if="shirt.featured" class="featured-badge" title="Destaque">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </span>
              </div>
            </div>
            
            <div class="product-info">
              <div class="product-main">
                <h3 class="product-name">{{ shirt.name }}</h3>
                <p class="product-price">R$ {{ shirt.price.toFixed(2) }}</p>
              </div>
              
              <div class="product-stats">
                <div class="stat">
                  <span class="label">Estoque</span>
                  <span class="value" :class="{ low: shirt.stock < 5 }">{{ shirt.stock }}</span>
                </div>
                <div class="stat">
                  <span class="label">Sizes</span>
                  <span class="value">{{ shirt.sizes.length }}</span>
                </div>
              </div>

              <div class="card-actions">
                <button class="edit-btn" @click="editProduct(shirt)">
                  <span>EDITAR</span>
                </button>
                <button class="delete-btn" @click="deleteProduct(shirt.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useShirtStore } from "../stores/shirtStore.js";
import { populateProducts } from "../utils/populateProducts.js";

export default {
  name: "AdminView",
  setup() {
    const shirtStore = useShirtStore();
    const showForm = ref(false);
    const editing = ref(false);
    const availableSizes = ["S", "M", "L", "XL", "XXL"];

    const form = reactive({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      stock: 0,
      sizes: [],
      featured: false,
    });

    const resetForm = () => {
      Object.assign(form, {
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        stock: 0,
        sizes: [],
        featured: false,
      });
      editing.value = false;
      showForm.value = false;
    };

    const handleSubmit = async () => {
      if (editing.value) {
        await shirtStore.updateShirt(editing.value, form);
      } else {
        await shirtStore.addShirt(form);
      }
      resetForm();
    };

    const editProduct = (shirt) => {
      Object.assign(form, shirt);
      editing.value = shirt.id;
      showForm.value = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteProduct = async (id) => {
      if (confirm("Deseja realmente remover este item do catálogo?")) {
        await shirtStore.deleteShirt(id);
      }
    };

    const handlePopulate = async () => {
      if (confirm("Isso irá restaurar os produtos padrão. Continuar?")) {
        await populateProducts();
        await shirtStore.fetchShirts();
      }
    };

    onMounted(() => {
      shirtStore.fetchShirts();
    });

    return {
      showForm,
      editing,
      form,
      availableSizes,
      shirts: computed(() => shirtStore.shirts),
      loading: computed(() => shirtStore.loading),
      error: computed(() => shirtStore.error),
      handleSubmit,
      editProduct,
      deleteProduct,
      populateProducts: handlePopulate,
      resetForm,
    };
  },
};
</script>

<style scoped>
.admin-view {
  min-height: 100vh;
  background: var(--bg);
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
}

.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.glow-1 {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  filter: blur(80px);
}

.glow-2 {
  position: absolute;
  bottom: 0%;
  left: -5%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  filter: blur(80px);
}

.admin-container {
  max-width: 1100px;
  position: relative;
  z-index: 1;
}

.admin-header {
  text-align: center;
  margin-bottom: 4rem;
}

.admin-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--muted);
  margin-bottom: 1rem;
}

.admin-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
  color: #fff;
}

.admin-subtitle {
  color: var(--muted);
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
}

.admin-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.action-btn {
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.action-btn.active {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.action-btn.secondary {
  color: var(--muted);
}

.product-form-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 3rem;
  margin-bottom: 5rem;
}

.form-header {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
}

.form-header h3 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.form-header p {
  font-size: 0.9rem;
  color: var(--muted);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.form-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  outline: none;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.sizes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.size-checkbox {
  flex: 1;
  min-width: 60px;
  height: 45px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--muted);
}

.size-checkbox input {
  display: none;
}

.size-checkbox:hover {
  background: rgba(255, 255, 255, 0.08);
}

.size-checkbox.selected {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.featured-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.featured-toggle input {
  width: 18px;
  height: 18px;
  accent-color: #fff;
}

.toggle-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--muted);
}

.form-actions {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
}

.submit-btn {
  flex: 2;
  padding: 1.25rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.submit-btn:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.cancel-btn {
  flex: 1;
  padding: 1.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.count-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.admin-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
}

.admin-product-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: all 0.4s ease;
}

.admin-product-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.product-preview {
  position: relative;
  height: 280px;
  background: #111;
  overflow: hidden;
}

.product-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.admin-product-card:hover .product-preview img {
  transform: scale(1.05);
}

.product-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-badge {
  background: #000;
  color: #fff;
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 4px;
}

.product-info {
  padding: 1.5rem;
}

.product-main {
  margin-bottom: 1.25rem;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-weight: 800;
  color: #fff;
  font-size: 1rem;
}

.product-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat .label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--muted);
}

.stat .value {
  font-size: 0.9rem;
  font-weight: 700;
}

.stat .value.low {
  color: var(--accent-red);
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.edit-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #fff;
  color: #000;
}

.delete-btn {
  width: 42px;
  background: rgba(255, 69, 58, 0.1);
  border: 1px solid rgba(255, 69, 58, 0.2);
  color: #ff453a;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.delete-btn:hover {
  background: #ff453a;
  color: #fff;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.4s ease;
  max-height: 1000px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  overflow: hidden;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
