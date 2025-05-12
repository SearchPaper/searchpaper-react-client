import ButtonDelete from "./DocumentsPageButtonDelete";
import ButtonView from "./DocumentsPageButtonView";
import { Document } from "./documentsStore";

interface Props {
  documents: Document[];
}
export default function DocumentsPageTable({ documents = [] }: Props) {
  const tableRows = documents.map((document) => (
    <tr key={document._id}>
      <td>{document.fileName}</td>
      <td className="flex gap-3">
        <ButtonView document={document} />
        <ButtonDelete document={document} />
      </td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto h-full">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
