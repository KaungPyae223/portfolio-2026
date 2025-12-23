import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type BreadCrumb = {
  title: string;
  link: string;
};

type DashboardStoreType = {
  breadCrumbContent: BreadCrumb[];
  title: string;
  
  setTitle: (title: string) => void;
  setBreadCrumbContent: (content: BreadCrumb[]) => void;
};

export const useDashboardStore = create<DashboardStoreType>()(
  immer((set) => ({
    breadCrumbContent: [],
    title: "",

    setTitle: (title) =>
      set((state) => {
        state.title = title;
      }),

    setBreadCrumbContent: (content) =>
      set((state) => {
        state.breadCrumbContent = content;
      }),
  }))
);
