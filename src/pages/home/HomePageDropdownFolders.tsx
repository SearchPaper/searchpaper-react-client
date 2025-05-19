import { useEffect, useState } from "react";
// import FoldersPagePagination from "../folders/FoldersPagePagination";
import { Folder, useFolderStore } from "../folders/foldersStore";

export default function HomePageDropdownFolders() {
  const { list: listFolders, folders, count, total } = useFolderStore();

  useEffect(() => {
    count();
    listFolders({ page: "0", size: total.toString(), term: "" });
  }, [total]);

  const [filteredFolders, setFilteredFolder] = useState<Folder[]>([]);

  const [folder, setFolder] = useState<string>("default-bucket");

  const options = (
    <>
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
        id="home-folder-select"
        className="select select-sm"
        children={options}
        onChange={(e) => setFolder(e.target.value)}
      />
    </label>
  );
}
