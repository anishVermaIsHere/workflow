import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type StoreType ={
    user: Auth,
    isLoggedIn: boolean,
    setUser: (user: Auth)=>void,
    clearUser: ()=>void
};

type Auth = {
    firstName: string,
    lastName: string,
    email: string,
    accessToken: string,
    refreshToken: string
};

const useAuthStore = create<StoreType>()(
  persist<StoreType>(
    (set) => ({
      isLoggedIn: false,
      user: {} as Auth,
      setUser: (user: Auth) => set(() => ({ user, isLoggedIn: true })),
      clearUser: () => set(() => ({ user: {} as Auth, isLoggedIn: false }))
    }),
    {
      name: "auth",
      getStorage: () => localStorage,
    } as PersistOptions<StoreType>
  )
);

export default useAuthStore;
