import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
};

type detailsStore = {
  detailsContent: Project | null;
  setDetailsContent: (content: Project | null) => void;
};

export const useDetailsStore = create<detailsStore>()(
  immer((set) => ({
    detailsContent: null,
    setDetailsContent: (content: Project | null) =>
      set({ detailsContent: content }),
  }))
);
