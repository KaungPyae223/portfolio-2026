import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type BreadCrumb = {
  title: string;
  link: string;
};

type BreadCrumbStore = {
  breadCrumbContent: BreadCrumb[];
  setBreadCrumbContent: (content: BreadCrumb[]) => void;
};

export const useBreadCrumbStore = create<BreadCrumbStore>()(
  immer((set) => ({
    breadCrumbContent: [],
    setBreadCrumbContent: (content) => set({ breadCrumbContent: content }),
  }))
);
