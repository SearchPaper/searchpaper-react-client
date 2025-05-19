import { create } from "zustand";

export interface Document {
  _id: string;
  fileName: string;
  uploadDateTime: string;
  folder: {
    _id: string;
    name: string;
    description: string;
  };
}

interface SearchParams {
  term: string;
  size: string;
  page: string;
  folder: string;
}

interface DocumentStore {
  searchParams: SearchParams;
  pages: number;
  documents: Document[];
  list: (searchParams: SearchParams) => Promise<Response>;
  remove: (document: Document) => Promise<Response>;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  searchParams: { term: "", page: "0", size: "7", folder: "" },
  pages: 0,
  documents: [],
  list: async (searchParams) => {
    const urlSearchParams = new URLSearchParams({ ...searchParams });

    const urlSearchParamsWithoutFolder = "/api/documents?" + urlSearchParams;

    const urlSearchParamsWithFolder =
      `/api/documents/folder/${searchParams.folder}?` + urlSearchParams;

    const url =
      searchParams.folder !== ""
        ? urlSearchParamsWithFolder
        : urlSearchParamsWithoutFolder;

    const response = await fetch(url);

    if (!response.ok) {
      /* just return early and do nothing */
      await response
        .json()
        .then((reason) => console.log(reason))
        .catch((err) => console.log(err));

      return response;
    }

    const pages = response.headers.get("pages");

    if (!pages) {
      throw new Error("page count was not present in headers");
    }

    const documents = (await response.json()) as Document[];

    set({
      pages: Number(pages),
      documents,
      searchParams,
    });

    return response;
  },

  remove: async (document) => {
    const { _id } = document;
    const response = await fetch(`/api/documents/${_id}`, {
      method: "DELETE",
    });
    return response;
  },
}));
