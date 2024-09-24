
import { create } from "zustand";

type AppState={
    sidebarToggle: boolean,
    isModalOpen: boolean,
    setIsModalOpen: (toggle: boolean)=>void,
    setSidebarToggle: (toggle: boolean)=>void
};

const useCommonStore=create<AppState>((set)=>({
    sidebarToggle: false,
    isModalOpen: false,
    setIsModalOpen: (toggle: boolean)=>set({ isModalOpen: toggle }),
    setSidebarToggle: (toggle: boolean)=>set(({ sidebarToggle: toggle }))
}));

export default useCommonStore;