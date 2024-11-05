import { create } from "zustand";

export const usehostalstore = create((set) => ({
    accounts: [],
    comp: [],
    currentUser: null, // To store the currently signed-in user

    setAccount: (accounts) => set({ accounts }),
    setComp: (comp) => set({ comp }),

    // Sign-up function
    createAccount: async (newAccount) => {
        if (!newAccount.name || !newAccount.email || !newAccount.password) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ accounts: [...state.accounts, data.data] }));
        }
        return { success: data.success, message: data.message };
    },

    // Sign-in function
    signInAccount: async (account) => {
        if (!account.email || !account.password) {
            return { success: false, message: "Please provide email and password." };
        }
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });
        const data = await res.json();

        if (data.success) {
            set({ currentUser: data.data });
        }
        return { success: data.success, message: data.message };
    },

    createAccountadmin: async (newAccount) => {
        if (!newAccount.name || !newAccount.email || !newAccount.password) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/signupadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ accounts: [...state.accounts, data.data] }));
        }
        return { success: data.success, message: data.message };
    },

    signInAccountadmin: async (account) => {
        if (!account.email || !account.password) {
            return { success: false, message: "Please provide email and password." };
        }
        const res = await fetch("/api/signinadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });
        const data = await res.json();

        if (data.success) {
            set({ currentUser: data.data });
        }
        return { success: data.success, message: data.message };
    },

    createComplain: async (Complaint) => {
        if (!Complaint.name || !Complaint.email || !Complaint.roomno || !Complaint.comp) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/complaint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Complaint),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ comp: [...state.comp, data.data] }));
        }
        return { success: data.success, message: data.message };
    },
    fetchComplaints: async () => {
        const res = await fetch("/api/getcomplaints", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.success) {
            set({ comp: data.data }); // Store complaints in comp state
        }
    },
}));
