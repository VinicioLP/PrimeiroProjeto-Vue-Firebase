<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Streetwear Shop</h1>
        <p class="hero-subtitle">
          Estilo urbano para os verdadeiros amantes da cultura de rua. Peças
          exclusivas que definem sua identidade.
        </p>
        <router-link to="/dashboard" class="hero-cta">
          Explorar Coleção
        </router-link>
      </div>
      <div class="scroll-indicator"></div>
    </section>

    <section class="featured">
      <div class="container">
        <h2>Coleção Destaque</h2>
        <ShirtCatalog />
      </div>
    </section>
  </div>
</template>

<script>
import ShirtCatalog from "../components/ShirtCatalog.vue";

export default {
  name: "HomeView",
  components: {
    ShirtCatalog,
  },
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.05), transparent 40%),
    linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
  color: var(--text);
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: -10%;
  right: -20%;
  width: 420px;
  height: 420px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
}

.hero::after {
  content: "";
  position: absolute;
  bottom: -12%;
  left: -18%;
  width: 520px;
  height: 520px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 680px;
  text-align: center;
  margin: 0 auto;
  background: var(--surface);
  padding: 3rem 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  margin-bottom: 1rem;
  color: var(--text);
}

.hero-subtitle {
  font-size: clamp(1.05rem, 2.5vw, 1.4rem);
  font-weight: 400;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.7;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--accent);
  color: #000;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: var(--transition);
}

.hero-cta:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 92, 152, 0.18);
}

.hero-cta::after {
  content: "→";
  transition: var(--transition);
}

.hero-cta:hover::after {
  transform: translateX(4px);
}

.featured {
  padding: 5rem 0;
  background: var(--bg);
}

.featured h2 {
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text);
  position: relative;
}

.featured h2::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 4px;
  background: var(--accent);
  border-radius: 999px;
}

@media (max-width: 768px) {
  .hero {
    min-height: 90vh;
    padding: 2rem 0;
  }

  .hero-content {
    padding: 2.5rem 1.5rem;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .featured {
    padding: 3rem 0;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
