import { create } from "zustand";

export interface FileWithId extends File {
  _id: string;
  success: boolean | undefined;
}

interface HomeStore {
  files: FileWithId[];
  transferQueue: FileWithId[];
  cleanTransferQueue: () => void;
  setFiles: (files: FileWithId[]) => void;
  removeFile: (_id: string) => void;
  startTransfer: (files: FileWithId[], folder: string) => void;
}

const queueEmitter = new EventTarget();

export const useFileTransferStore = create<HomeStore>((set) => ({
  files: [],
  transferQueue: [],
  cleanTransferQueue: () => set({ transferQueue: [] }),
  setFiles: (files: FileWithId[]) => {
    set({ files });
  },
  removeFile: function (_id: string) {
    return set((state) => ({
      files: [...state.files].filter((file) => file._id !== _id),
    }));
  },
  startTransfer: async (files, folder) => {
    for (const file of files) {
      const event = new CustomEvent("enqueue", { detail: { file, folder } });
      queueEmitter.dispatchEvent(event);
    }
  },
}));

queueEmitter.addEventListener("enqueue", async (event) => {
  const customEvent = event as CustomEvent;
  const { file, folder } = customEvent.detail;

  const formData = new FormData();
  formData.append("file", file);

  useFileTransferStore.setState((state) => ({
    transferQueue: [...state.transferQueue, file],
  }));

  try {
    const response = await fetch("/api/documents/" + folder, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(60_000),
    });

    useFileTransferStore.setState((state) => ({
      transferQueue: [...state.transferQueue].filter(
        (enqueuedFile) => enqueuedFile._id !== file._id
      ),
    }));

    if (!response.ok) {
      file.success = false;
      useFileTransferStore.setState((state) => ({
        transferQueue: [...state.transferQueue, file],
      }));
      return;
    }

    file.success = true;
    useFileTransferStore.setState((state) => ({
      transferQueue: [...state.transferQueue, file],
    }));

    return;
  } catch (error) {
    console.log(error);

    useFileTransferStore.setState((state) => ({
      transferQueue: [...state.transferQueue].filter(
        (enqueuedFile) => enqueuedFile._id !== file._id
      ),
    }));

    file.success = false;
    useFileTransferStore.setState((state) => ({
      transferQueue: [...state.transferQueue, file],
    }));
    return;
  }
});
