import { defineStore } from "pinia";
import { auth } from "../firebase/config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: email === "admin@streetwear.com" ? "admin" : "user",
        };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: "user",
        };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    setUser(user) {
      this.user = user;
    },
  },
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  const authStore = useAuthStore();
  if (user) {
    authStore.setUser({
      uid: user.uid,
      email: user.email,
      role: user.email === "admin@streetwear.com" ? "admin" : "user",
    });
  } else {
    authStore.setUser(null);
  }
});
