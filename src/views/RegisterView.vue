<template>
  <div class="register-view">
    <div class="background-decor">
      <div class="glow-1"></div>
      <div class="glow-2"></div>
    </div>
    
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <div class="brand-logo">STREETWEAR</div>
          <h1 class="register-title">Criar Conta</h1>
          <p class="register-subtitle">Junte-se à elite urbana e tenha acesso exclusivo.</p>
        </div>

        <form class="register-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <div class="input-wrapper">
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder=" "
                required
              />
              <label for="email">E-mail</label>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-input"
                placeholder=" "
                required
              />
              <label for="password">Senha</label>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="form-input"
                placeholder=" "
                required
              />
              <label for="confirmPassword">Confirmar Senha</label>
            </div>
          </div>

          <div class="register-actions">
            <button type="submit" class="register-btn" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? "PROCESSANDO..." : "REGISTRAR AGORA" }}
              <span class="btn-shine"></span>
            </button>
          </div>
        </form>

        <Transition name="fade">
          <div v-if="error" class="error-toast">
            <span class="error-msg">{{ error }}</span>
            <button class="close-error" @click="authStore.error = null">×</button>
          </div>
        </Transition>

        <div class="register-footer">
          <p>Já faz parte do bando? <router-link to="/login">Entre aqui</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";

export default {
  name: "RegisterView",
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();
    const authStore = useAuthStore();

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        authStore.error = "As senhas não coincidem.";
        return;
      }
      
      await authStore.register(email.value, password.value);
      if (authStore.isAuthenticated) {
        router.push("/dashboard");
      }
    };

    return {
      email,
      password,
      confirmPassword,
      loading: computed(() => authStore.loading),
      error: computed(() => authStore.error),
      authStore,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #0a0a0a;
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
}

.glow-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  filter: blur(60px);
}

.glow-2 {
  position: absolute;
  bottom: -10%;
  left: -5%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  filter: blur(60px);
}

.register-container {
  width: 100%;
  max-width: 460px;
  position: relative;
  z-index: 1;
}

.register-card {
  background: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 3.5rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.brand-logo {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  font-weight: 800;
  margin-bottom: 2rem;
  color: var(--muted);
  text-transform: uppercase;
}

.register-header {
  margin-bottom: 3rem;
  text-align: center;
}

.register-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.register-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  font-weight: 400;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1.25rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  left: 1.25rem;
  top: 1.25rem;
  padding: 0 0.25rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

.form-input:focus,
.form-input:not(:placeholder-shown) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.form-input:focus + label,
.form-input:not(:placeholder-shown) + label {
  top: -0.6rem;
  left: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  background: #1a1a1a;
  border-radius: 4px;
}

.register-actions {
  margin-top: 1rem;
}

.register-btn {
  width: 100%;
  padding: 1.25rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 16px;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.register-btn:hover {
  background: #eee;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
}

.register-btn:active {
  transform: translateY(0);
}

.register-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.6s ease-in-out;
}

.register-btn:hover .btn-shine {
  left: 100%;
}

.error-toast {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.2);
  border-radius: 14px;
  color: #ff453a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-error {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
}

.register-footer {
  margin-top: 2.5rem;
  text-align: center;
}

.register-footer p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
}

.register-footer a {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}

.register-footer a:hover {
  border-bottom-color: #fff;
  color: #fff;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .register-card {
    padding: 2.5rem 1.5rem;
  }
  
  .register-title {
    font-size: 2.25rem;
  }
}
</style>
