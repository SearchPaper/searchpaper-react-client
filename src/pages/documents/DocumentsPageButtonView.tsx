import { Document } from "./documentsStore";

interface Props {
  document: Document;
}

export default function DocumentsPageButtonView({ document }: Props) {
  return (
    <a
      href={"/api/documents/" + document._id}
      className="btn btn-xs btn-primary btn-circle"
      target="_blank"
    >
      <i className="fa-solid fa-eye"></i>
    </a>
  );
}
