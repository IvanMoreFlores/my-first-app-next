import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const createUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
