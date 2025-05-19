import { Navbar } from "../../components/Navbar";
import DocumentsPageDropdownFolders from "./DocumentsPageDropdownFolders";
import Pagination from "./DocumentsPagePagination";
import SearchBar from "./DocumentsPageSearchBar";
import Table from "./DocumentsPageTable";
import { useDocumentStore } from "./documentsStore";
import { useEffect, useState } from "react";

export default function DocumentsPage() {
  const { list, documents, pages, searchParams } = useDocumentStore();
  const { folder } = searchParams;
  const [isLoading, setIsLoading] = useState(false);

  const [page, size, term] = ["0", "7", ""];

  useEffect(() => {
    setIsLoading(true);
    list({ page, size, term, folder }).then(() => setIsLoading(false));
  }, []);

  return (
    <template className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto grid gap-3">
        <div className="flex flex-col xl:flex-row justify-between gap-3">
          <SearchBar />
          <DocumentsPageDropdownFolders />
        </div>
        <br />
        <progress
          className="progress progress-primary"
          value={isLoading ? undefined : 100}
          max="100"
        ></progress>

        <Table documents={documents} />
        <Pagination pages={pages} />
      </main>
    </template>
  );
}
