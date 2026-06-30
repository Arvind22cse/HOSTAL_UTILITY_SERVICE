import { create } from "zustand";
import { persist } from "zustand/middleware";

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const usehostalstore = create(
  persist(
    (set, get) => ({
      comp: [],
      food: [],
      stud: [],
      ann: [],
      currentUser: null,
      token: null,

      setAuth: (user, token) => set({ currentUser: user, token }),
      logout: () => set({ currentUser: null, token: null, comp: [], food: [], stud: [], ann: [] }),

      createAccount: async (newAccount) => {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (data.success) {
          set({ currentUser: data.data, token: data.token });
        }
        return { success: data.success, message: data.message };
      },

      signInAccount: async (account) => {
        const res = await fetch("/api/signin", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(account),
        });
        const data = await res.json();
        if (data.success) {
          set({ currentUser: data.data, token: data.token });
        }
        return { success: data.success, message: data.message };
      },

      createAccountadmin: async (newAccount) => {
        const res = await fetch("/api/signupadmin", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (data.success) {
          set({ currentUser: data.data, token: data.token });
        }
        return { success: data.success, message: data.message };
      },

      signInAccountadmin: async (account) => {
        const res = await fetch("/api/signinadmin", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(account),
        });
        const data = await res.json();
        if (data.success) {
          set({ currentUser: data.data, token: data.token });
        }
        return { success: data.success, message: data.message };
      },

      createComplain: async (complaint) => {
        const { token } = get();
        const res = await fetch("/api/complaint", {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(complaint),
        });
        const data = await res.json();
        return { success: data.success, message: data.message || data.message };
      },

      fetchMyComplaints: async () => {
        const { token } = get();
        const res = await fetch("/api/my-complaints", {
          headers: authHeaders(token),
        });
        const data = await res.json();
        if (data.success) set({ comp: data.data });
        return data;
      },

      fetchComplaints: async () => {
        const { token } = get();
        const res = await fetch("/api/getcomplaints", {
          headers: authHeaders(token),
        });
        const data = await res.json();
        if (data.success) set({ comp: data.data });
        return data;
      },

      updateComplaint: async (id, updates) => {
        const { token } = get();
        const res = await fetch(`/api/complaints/${id}`, {
          method: "PATCH",
          headers: authHeaders(token),
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({
            comp: state.comp.map((c) => (c._id === id ? data.data : c)),
          }));
        }
        return data;
      },

      createFood: async (foodItem) => {
        const { token } = get();
        const res = await fetch("/api/create_food", {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(foodItem),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({ food: [...state.food, data.data] }));
        }
        return { success: data.success, message: data.message };
      },

      updateFood: async (id, foodItem) => {
        const { token } = get();
        const res = await fetch(`/api/food/${id}`, {
          method: "PUT",
          headers: authHeaders(token),
          body: JSON.stringify(foodItem),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({
            food: state.food.map((f) => (f._id === id ? data.data : f)),
          }));
        }
        return { success: data.success, message: data.message };
      },

      deleteFood: async (id) => {
        const { token } = get();
        const res = await fetch(`/api/food/${id}`, {
          method: "DELETE",
          headers: authHeaders(token),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({ food: state.food.filter((f) => f._id !== id) }));
        }
        return { success: data.success, message: data.message };
      },

      fetchfood: async () => {
        const res = await fetch("/api/getfood");
        const data = await res.json();
        if (data.success) set({ food: data.data });
      },

      fetchstud: async () => {
        const { token } = get();
        const res = await fetch("/api/hostalstud", {
          headers: authHeaders(token),
        });
        const data = await res.json();
        if (data.success) set({ stud: data.data });
      },

      createAnnounce: async (announce) => {
        const { token } = get();
        const res = await fetch("/api/announce", {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(announce),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({ ann: [data.data, ...state.ann] }));
        }
        return { success: data.success, message: data.message };
      },

      fetchAnnounce: async () => {
        const res = await fetch("/api/getannounce");
        const data = await res.json();
        if (data.success) set({ ann: data.data });
      },

      deleteAnnounce: async (id) => {
        const { token } = get();
        const res = await fetch(`/api/announce/${id}`, {
          method: "DELETE",
          headers: authHeaders(token),
        });
        const data = await res.json();
        if (data.success) {
          set((state) => ({ ann: state.ann.filter((a) => a._id !== id) }));
        }
        return data;
      },
    }),
    {
      name: "hostel-auth",
      partialize: (state) => ({ currentUser: state.currentUser, token: state.token }),
    }
  )
);
