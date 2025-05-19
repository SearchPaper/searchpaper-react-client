import ButtonDelete from "./FoldersPageButtonDelete";
import ButtonUpdate from "./FoldersPageButtonUpdate";
import ButtonView from "./FoldersPageButtonView";
import ButtonZip from "./FoldersPageButtonZip";
import { Folder } from "./foldersStore";

interface Parameters {
  folders: Folder[];
}
export default function FoldersPageTable({ folders = [] }: Parameters) {
  const tableRows = folders.map((folder) => (
    <tr key={folder._id}>
      <td>{folder.name}</td>
      <td>{folder.description}</td>
      <td className="flex gap-3">
        <ButtonView folder={folder} />
        <ButtonZip folder={folder} />
        <ButtonUpdate folder={folder} />
        <ButtonDelete folder={folder} />
      </td>
    </tr>
  ));
  return (
    <div className="overflow-x-auto h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
