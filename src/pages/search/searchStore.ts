import { create } from "zustand";

export interface SearchResult {
  _id: string;
  untrustedFileName: string;
  uploadDateTime: string;
  highlight: string[];
}

interface SearchParams {
  query: string;
  size: string;
  page: string;
}

interface SearchStore {
  pages: number;
  searchResults: SearchResult[];
  searchParams: SearchParams;
  search: (searchParams: SearchParams) => Promise<Response>;
}

export const useSearchStore = create<SearchStore>((set) => ({
  pages: 0,
  searchParams: { page: "0", query: "", size: "7" },
  searchResults: [],
  search: async (searchParams) => {
    const urlSearchParams = new URLSearchParams({ ...searchParams });
    const response = await fetch(`/api/search?` + urlSearchParams);

    const json = await response.json();

    if (!response.ok) {
      console.log(json);

      return response;
    }

    const pages = response.headers.get("pages");

    const searchResults = json as SearchResult[];

    set({ pages: Number(pages), searchResults, searchParams });

    return response;
  },
}));
