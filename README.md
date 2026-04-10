# Streetwear Shop

Uma loja de camisetas streetwear moderna construída com Vue 3, Pinia e Firebase.

## Tecnologias

- Vue 3 (Composition API)
- Pinia (State Management)
- Vue Router
- Firebase (Authentication, Firestore, Storage)
- Vite (Build Tool)

## Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative Authentication (Email/Password)
4. Ative Firestore Database
5. (Opcional) Ative Storage para upload de imagens

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com suas configurações do Firebase:

```bash
cp .env.example .env
```

Edite o `.env` com suas chaves reais do Firebase.

### 4. Popular produtos (opcional)

Para adicionar produtos iniciais ao Firestore, execute no console do navegador após login como admin:

```javascript
import { populateProducts } from "./src/utils/populateProducts.js";
populateProducts();
```

### 5. Executar o projeto

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Design & UX

- **Tema Streetwear Premium**: Design urbano moderno com tipografia Inter e JetBrains Mono
- **Sistema de Cores**: Preto, branco, ouro e vermelho para identidade forte
- **Layout Responsivo**: Otimizado para desktop, tablet e mobile
- **Animações Suaves**: Transições CSS modernas e micro-interações
- **Cards Interativos**: Hover effects e sombras dinâmicas
- **Navbar Fixa**: Com efeito de scroll e menu mobile
- **Loading States**: Spinners e estados de carregamento elegantes

## Funcionalidades Pendentes

- Carrinho de compras
- Checkout/Pagamento
- Upload de imagens para Storage
- Filtros de produtos
- Histórico de compras

## Estrutura do Projeto

```
src/
├── components/
│   ├── ShirtCard.vue      # Card individual do produto
│   └── ShirtCatalog.vue   # Listagem de produtos
├── firebase/
│   └── config.js          # Configuração Firebase
├── router/
│   └── index.js           # Configuração de rotas
├── stores/
│   ├── authStore.js       # Store de autenticação
│   └── shirtStore.js      # Store de produtos
├── utils/
│   └── populateProducts.js # Utilitário para popular DB
└── views/
    ├── AdminView.vue      # Painel admin
    ├── DashboardView.vue  # Dashboard usuário
    ├── HomeView.vue       # Página inicial
    └── LoginView.vue      # Tela de login
```

## Contas de Teste

- **Admin**: admin@streetwear.com / senha: qualquer
- **Usuário**: user@example.com / senha: qualquer

## Desenvolvimento

Para desenvolvimento, use:

```bash
npm run dev
```

Para build de produção:

```bash
npm run build
```
# Firibase-Pinia
