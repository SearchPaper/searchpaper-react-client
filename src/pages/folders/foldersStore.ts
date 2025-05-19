import { create } from "zustand";

export interface Folder {
  _id: string;
  name: string;
  description: string;
  bucket: string;
  createdAt: string;
}

interface SearchParams {
  term: string;
  size: string;
  page: string;
}

interface FolderStore {
  pages: number;
  total: number;
  searchParams: SearchParams;
  folders: Folder[];
  list: (searchParams: SearchParams) => Promise<Response>;
  count: () => Promise<Response>;
  create: (folder: Folder) => Promise<Response>;
  update: (folder: Folder) => Promise<Response>;
  remove: (folder: Folder) => Promise<Response>;
}

export const useFolderStore = create<FolderStore>((set) => ({
  pages: 0,
  total: 7,
  searchParams: { page: "0", size: "7", term: "" },
  folders: [],
  list: async (searchParams) => {
    const urlSearchParams = new URLSearchParams({ ...searchParams });

    const respone = await fetch("/api/folders?" + urlSearchParams);

    if (!respone.ok) {
      /* just return early and do nothing */
      return respone;
    }

    const pages = respone.headers.get("pages");

    if (!pages) {
      throw new Error("page count was not present in headers");
    }

    const folders = (await respone.json()) as Folder[];

    set({ pages: Number(pages), folders, searchParams });

    return respone;
  },
  count: async () => {
    const respone = await fetch("/api/folders/count");

    if (!respone.ok) {
      /* just return early and do nothing */
      return respone;
    }

    const total = (await respone.json()) as number;

    set({ total });

    return respone;
  },
  create: async (folder: Folder) => {
    const respone = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    });
    return respone;
  },
  update: async (folder) => {
    const { _id } = folder;
    const respone = await fetch(`/api/folders/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    });
    return respone;
  },
  remove: async (folder) => {
    const { _id } = folder;
    const respone = await fetch(`/api/folders/${_id}`, {
      method: "DELETE",
    });
    return respone;
  },
}));
