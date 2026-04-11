<template>
  <div id="app">
    <header class="navbar" :class="{ scrolled: isScrolled }">
      <div class="container">
        <router-link to="/" class="brand">Streetwear Shop</router-link>

        <!-- Desktop Navigation -->
        <nav class="nav-menu" :class="{ active: mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu"
            >Home</router-link
          >
          <router-link
            to="/dashboard"
            class="nav-link"
            v-if="isLoggedIn"
            @click="closeMobileMenu"
            >Dashboard</router-link
          >
          <router-link
            to="/admin"
            class="nav-link"
            v-if="isAdmin"
            @click="closeMobileMenu"
            >Painel Admin</router-link
          >
          <router-link
            to="/login"
            class="nav-link"
            v-if="!isLoggedIn"
            @click="closeMobileMenu"
            >Login</router-link
          >
          <router-link
            v-if="isLoggedIn"
            to="/cart"
            class="nav-link cart-link"
            @click="closeMobileMenu"
          >
            <span class="cart-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                />
              </svg>
              <span v-if="cartCount > 0" class="cart-badge">{{
                cartCount
              }}</span>
            </span>
          </router-link>
          <button
            v-if="isLoggedIn"
            class="logout-btn"
            @click="logout"
            title="Sair"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </nav>

        <!-- Mobile Menu Toggle -->
        <div
          class="mobile-menu-toggle"
          :class="{ active: mobileMenuOpen }"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Streetwear Shop. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "./stores/authStore.js";
import { useCartStore } from "./stores/cartStore.js";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const mobileMenuOpen = ref(false);
    const isScrolled = ref(false);

    const isLoggedIn = computed(() => authStore.isAuthenticated);
    const isAdmin = computed(() => authStore.user?.role === "admin");
    const cartCount = computed(() => cartStore.cartCount);

    const logout = async () => {
      await authStore.logout();
      mobileMenuOpen.value = false;
      router.push("/");
    };

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isLoggedIn,
      isAdmin,
      cartCount,
      mobileMenuOpen,
      isScrolled,
      logout,
      toggleMobileMenu,
      closeMobileMenu,
    };
  },
};
</script>

<style scoped>
.cart-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.cart-icon-wrapper {
  position: relative;
  font-size: 1.25rem;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--accent-red);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 2px solid #1a1a1a;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  transition: var(--transition);
}

.navbar.scrolled {
  box-shadow: 0 10px 30px rgba(140, 42, 146, 0.08);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  max-width: 1200px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  text-decoration: none;
  transition: var(--transition);
}

.brand:hover {
  color: var(--accent);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: var(--transition);
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 70%;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
}

.logout-btn {
  background: var(--accent);
  color: #000;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: var(--transition);
}

.logout-btn:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(255, 92, 152, 0.18);
}

main {
  margin-top: 100px;
  min-height: calc(100vh - 160px);
}

.footer {
  background: var(--surface-muted);
  color: var(--muted);
  padding: 3rem 0 2rem;
  border-top: 1px solid var(--border);
}

.footer .container {
  text-align: center;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.85;
}

/* Mobile Menu */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--text);
  transition: var(--transition);
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--surface);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    border-bottom: 1px solid var(--border);
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navbar .container {
    padding: 1rem;
  }

  .brand {
    font-size: 1.25rem;
  }
}
</style>
