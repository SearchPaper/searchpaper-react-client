import { useLocation } from "wouter";
import { Folder } from "./foldersStore";
import { useDocumentStore } from "../documents/documentsStore";
interface Parameters {
  folder: Folder;
}

export default function FoldersPageButtonView({ folder }: Parameters) {
  const [, navigate] = useLocation();
  const { list } = useDocumentStore();

  const onClick = async (folder: string) => {
    await list({ folder, page: "0", size: "7", term: "" });
    navigate("/documents");
  };

  return (
    <button
      onClick={onClick.bind(onClick, folder._id)}
      className="btn btn-xs btn-primary btn-circle"
    >
      <i className="fa-solid fa-eye" />
    </button>
  );
}
