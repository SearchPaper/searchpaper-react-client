import { useEffect, useState } from "react";
// import FoldersPagePagination from "../folders/FoldersPagePagination";
import { Folder, useFolderStore } from "../folders/foldersStore";
import { useDocumentStore } from "./documentsStore";

export default function DocumentsPageDropdownFolders() {
  const { list: listFolders, folders, count, total } = useFolderStore();

  useEffect(() => {
    count();
    listFolders({ page: "0", size: total.toString(), term: "" });
  }, [total]);

  const [filteredFolders, setFilteredFolder] = useState<Folder[]>([]);

  const { list: listDocuments, searchParams: documentsSearchParams } =
    useDocumentStore();

  const { folder } = documentsSearchParams;

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const folder = e.target.value;
    await listDocuments({ ...documentsSearchParams, folder });
  };

  const options = (
    <>
      <option value="">All</option>

      {filteredFolders.length === 0 &&
        folders.map((folder) => (
          <option value={folder._id} key={folder._id}>
            {folder.name}
          </option>
        ))}

      {filteredFolders.length > 0 &&
        filteredFolders.map((folder) => (
          <option value={folder._id} key={folder._id}>
            {folder.name}
          </option>
        ))}
    </>
  );

  return (
    <div>
      <label className="input grid w-full">
        <input
          type="text"
          placeholder="Search Folders"
          onChange={(e) =>
            setFilteredFolder(
              [...folders].filter((folder) =>
                folder.name
                  .toLocaleLowerCase()
                  .startsWith(e.target.value.toLocaleLowerCase())
              )
            )
          }
        />
        <select
          value={folder}
          children={options}
          onChange={onChange}
          className="select select-sm"
        />
      </label>
      <br />
    </div>
  );
}
