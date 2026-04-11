<template>
  <div class="login-view">
    <div class="background-decor">
      <div class="glow-1"></div>
      <div class="glow-2"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="brand-logo">STREETWEAR</div>
          <h1 class="login-title">Bem-vindo</h1>
          <p class="login-subtitle">
            Acesso exclusivo para membros da comunidade.
          </p>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
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

          <div class="login-actions">
            <button type="submit" class="login-btn" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? "ENTRANDO..." : "ENTRAR NA CONTA" }}
              <span class="btn-shine"></span>
            </button>
          </div>
        </form>

        <Transition name="fade">
          <div v-if="error" class="error-toast">
            <span class="error-msg">{{ error }}</span>
            <button class="close-error" @click="authStore.error = null">
              ×
            </button>
          </div>
        </Transition>

        <div class="login-footer">
          <p>
            Ainda não tem uma conta?
            <router-link to="/register">Crie uma</router-link>
          </p>
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
  name: "LoginView",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const authStore = useAuthStore();

    const handleLogin = async () => {
      await authStore.login(email.value, password.value);
      if (authStore.isAuthenticated) {
        const redirect =
          router.currentRoute.value.query.redirect || "/dashboard";
        router.push(redirect);
      }
    };

    return {
      email,
      password,
      loading: computed(() => authStore.loading),
      error: computed(() => authStore.error),
      authStore,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-view {
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
  top: -15%;
  left: -5%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.04) 0%,
    transparent 70%
  );
  filter: blur(80px);
}

.login-container {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
}

.login-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 36px;
  padding: 4rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
}

.brand-logo {
  font-size: 0.75rem;
  letter-spacing: 0.5em;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  text-align: center;
}

.login-header {
  margin-bottom: 3.5rem;
  text-align: center;
}

.login-title {
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.05em;
  line-height: 1;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  font-weight: 400;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1.35rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.input-wrapper label {
  position: absolute;
  left: 1.35rem;
  top: 1.35rem;
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

.form-input:focus,
.form-input:not(:placeholder-shown) {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.25);
}

.form-input:focus + label,
.form-input:not(:placeholder-shown) + label {
  top: -0.65rem;
  left: 0.85rem;
  font-size: 0.7rem;
  font-weight: 800;
  color: #fff;
  background: #111;
  padding: 0 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.login-actions {
  margin-top: 1rem;
}

.login-btn {
  width: 100%;
  padding: 1.35rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 18px;
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.login-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px;
}

.login-btn:disabled {
  opacity: 0.4;
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
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.7s ease;
}

.login-btn:hover .btn-shine {
  left: 100%;
}

.error-toast {
  margin-top: 2rem;
  padding: 1.25rem;
  background: rgba(255, 69, 58, 0.08);
  border: 1px solid rgba(255, 69, 58, 0.2);
  border-radius: 16px;
  color: #ff453a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.close-error {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.login-footer {
  margin-top: 3.5rem;
  text-align: center;
}

.login-footer p {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.login-footer a {
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  padding-bottom: 2px;
}

.login-footer a:hover {
  border-bottom-color: #fff;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  .login-card {
    padding: 3rem 1.5rem;
  }

  .login-title {
    font-size: 2.5rem;
  }
}
</style>
