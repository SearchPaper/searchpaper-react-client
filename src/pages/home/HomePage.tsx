import { Navbar } from "../../components/Navbar";
import SearchBar from "./HomePageSearchBar";
import {
  FileWithId,
  useFileTransferStore,
} from "../../stores/fileTransferStore";

import { v4 as uuidv4 } from "uuid";

import UploadButton from "./HomePageButtonUpload";

export default function HomePage() {
  const { setFiles } = useFileTransferStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const fileList = e.dataTransfer.files as FileList;
    const files = Array.from(fileList);
    const filesWithId = files.map((file) => {
      Object.assign(file, { _id: uuidv4() });
      return file as FileWithId;
    });

    setFiles(Array.from(filesWithId));
  };

  return (
    <template className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto grid grid-rows-10 grow gap-3 p-3">
        <SearchBar />

        <div
          className="border border-primary border-dashed rounded-xl row-span-5 flex flex-col justify-center place-items-center gap-1 text-xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <UploadButton />
        </div>
      </main>
    </template>
  );
}
