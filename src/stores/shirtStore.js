import { defineStore } from "pinia";
import { db } from "../firebase/config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useShirtStore = defineStore("shirt", {
  state: () => ({
    shirts: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchShirts() {
      this.loading = true;
      this.error = null;
      try {
        const querySnapshot = await getDocs(collection(db, "shirts"));
        this.shirts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async addShirt(shirt) {
      this.loading = true;
      this.error = null;
      try {
        await addDoc(collection(db, "shirts"), shirt);
        await this.fetchShirts();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateShirt(id, shirt) {
      this.loading = true;
      this.error = null;
      try {
        await updateDoc(doc(db, "shirts", id), shirt);
        await this.fetchShirts();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteShirt(id) {
      this.loading = true;
      this.error = null;
      try {
        await deleteDoc(doc(db, "shirts", id));
        await this.fetchShirts();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
