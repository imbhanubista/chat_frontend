import create from "zustand";
import { persist } from "zustand/middleware";

const store = create(
  persist((set) => ({
    token: "",
    setToken: (token) => set({ token: token }),
  }))
);

export default store;

export const userId = create(
  persist((set) => ({
    userId: "",
    setUserId: (userId) => set({ userId: userId }),
  }))
);
