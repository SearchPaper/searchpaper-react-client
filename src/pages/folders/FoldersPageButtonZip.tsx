import { Folder } from "./foldersStore";

interface Props {
  folder: Folder;
}

export default function FoldersPageButtonZip({ folder }: Props) {
  return (
    <a
      href={"/api/folders/zip/" + folder._id}
      className="btn btn-xs btn-primary btn-circle"
      target="_blank"
    >
      <i className="fa-solid fa-file-zipper" />
    </a>
  );
}
