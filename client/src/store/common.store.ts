
import { create } from "zustand";

type AppState={
    sidebarToggle: boolean,
    setSidebarToggle: (toggle: boolean)=>void
};

const useCommonStore=create<AppState>((set)=>({
    sidebarToggle: false,
    setSidebarToggle: (toggle: boolean)=>set(({ sidebarToggle: toggle }))
}));

export default useCommonStore;