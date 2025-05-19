import { Navbar } from "../../components/Navbar";
import Pagination from "./FoldersPagePagination";
import SearchBar from "./FoldersPageSearchBar";
import Table from "./FoldersPageTable";
import { useFolderStore } from "./foldersStore";
import { useEffect } from "react";
import ButtonCreate from "./FoldersPageButtonCreate";

export default function FoldersPage() {
  const { list, folders, pages } = useFolderStore();

  const [page, size, term] = ["0", "7", ""];

  useEffect(() => {
    list({ page, size, term });
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto container gap-3 grid p-3">
        <section className="flex gap-3">
          <SearchBar />
          <ButtonCreate />
        </section>
        <Table folders={folders} />
        <Pagination pages={pages} />
      </div>
    </>
  );
}
