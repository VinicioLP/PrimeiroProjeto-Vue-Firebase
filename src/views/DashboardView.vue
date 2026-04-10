<template>
  <div class="dashboard-view">
    <div class="container dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Bem-vindo de volta, {{ user?.email }}!</p>
      </div>

      <div class="welcome-message">
        <h2>Sua conta está ativa</h2>
        <p>
          Explore nossa coleção exclusiva de streetwear e descubra as últimas
          tendências da cultura urbana.
        </p>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon user"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <h3 class="card-title">Perfil</h3>
          <p class="card-description">
            Gerencie suas informações pessoais e preferências de conta.
          </p>
        </div>

        <div class="dashboard-card">
          <div class="card-icon stats"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          <h3 class="card-title">Estatísticas</h3>
          <p class="card-description">
            Acompanhe suas atividades e interações na plataforma.
          </p>
          <div class="card-stats">
            <div>
              <div class="stat-number">0</div>
              <div class="stat-label">Pedidos</div>
            </div>
          </div>
        </div>

        <router-link to="/cart" class="dashboard-card clickable-card">
          <div class="card-icon orders"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
          <h3 class="card-title">Carrinho</h3>
          <p class="card-description">Continue suas compras onde parou.</p>
          <div class="card-stats">
            <div>
              <div class="stat-number">{{ cartCount }}</div>
              <div class="stat-label">Itens</div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="quick-actions">
        <h3>Ações Rápidas</h3>
        <div class="actions-grid">
          <router-link to="/" class="action-btn">
            <span class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
            Ver Produtos
          </router-link>
          <router-link v-if="isAdmin" to="/admin" class="action-btn">
            <span class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
            Painel Admin
          </router-link>
          <button class="action-btn" @click="logout">
            <span class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore.js";
import { useCartStore } from "../stores/cartStore.js";
import { useRouter } from "vue-router";

export default {
  name: "DashboardView",
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const user = computed(() => authStore.user);
    const isAdmin = computed(() => authStore.user?.role === "admin");
    const cartCount = computed(() => cartStore.cartCount);

    const logout = async () => {
      await authStore.logout();
      router.push("/");
    };

    return {
      user,
      isAdmin,
      cartCount,
      logout,
    };
  },
};
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  background: var(--off-white);
  padding: 2rem 0;
}

.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--primary-black);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  color: var(--medium-gray);
  line-height: 1.6;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.dashboard-card {
  background: var(--pure-white);
  border-radius: var(--border-radius-large);
  box-shadow: 0 4px 20px var(--shadow-light);
  padding: 2rem;
  transition: var(--transition);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--shadow-medium);
}

.clickable-card {
  text-decoration: none;
  display: block;
}

.clickable-card:hover {
  border-color: var(--accent);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-icon.user {
  background: linear-gradient(135deg, var(--accent-gold), #ffb347);
}

.card-icon.stats {
  background: linear-gradient(135deg, var(--accent-red), #ff6b6b);
}

.card-icon.orders {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-black);
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(--medium-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-black);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quick-actions {
  background: var(--pure-white);
  border-radius: var(--border-radius-large);
  box-shadow: 0 4px 20px var(--shadow-light);
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.quick-actions h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-black);
  margin-bottom: 1.5rem;
  text-align: center;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--off-white);
  border: 2px solid #e1e1e1;
  border-radius: var(--border-radius);
  color: var(--primary-black);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  text-align: center;
  justify-content: center;
}

.action-btn:hover {
  border-color: var(--primary-black);
  background: var(--primary-black);
  color: var(--pure-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--shadow-medium);
}

.action-icon {
  font-size: 1.25rem;
}

.welcome-message {
  background: linear-gradient(
    135deg,
    var(--primary-black) 0%,
    var(--secondary-black) 100%
  );
  color: var(--pure-white);
  border-radius: var(--border-radius-large);
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-message h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.welcome-message p {
  opacity: 0.9;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .dashboard-view {
    padding: 1rem 0;
  }

  .dashboard-container {
    padding: 0 1rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-title {
    font-size: 2rem;
  }
}
</style>
