import { create } from 'zustand';

interface FilterStore {
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: '',
  selectedCategory: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearFilters: () => set({ searchTerm: '', selectedCategory: '' }),
}));