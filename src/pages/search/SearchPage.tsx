import { Link } from "wouter";
import SearchBar from "./SearchPageSearchbar";
import SearchPageSearchResults from "./SearchPageSearchResults";
import { Navbar, NavbarDropdownMenu } from "../../components/Navbar";
import { useSearchStore } from "./searchStore";
import Pagination from "./SearchPagePagination";
import DrawerButtonUpload from "../../components/DrawerButtonUpload";

export default function SearchPage() {
  const { searchResults, pages } = useSearchStore();

  return (
    <main className="min-h-screen flex gap-5 pt-3 pb-3 ps-2 pe-2 justify-center">
      <section id="logo-section" className="hidden xl:flex sm:basis-2/12">
        <Link to="/" className="btn btn-primary font-normal">
          SearchPaper
        </Link>
      </section>
      <section
        id="main-section"
        className="basis-full xl:basis-5/12 flex flex-col gap-3"
      >
        <div className="flex xl:hidden ">
          <Navbar />
        </div>

        <SearchBar />

        <SearchPageSearchResults searchResults={searchResults} />

        <Pagination pages={pages} />
      </section>
      <section
        id="exhibit-section"
        className="hidden xl:basis-5/12 xl:flex flex-col items-end"
      >
        <section
          id="nav-section-of-exhibit-section"
          className="flex items-center"
        >
          <DrawerButtonUpload />
          <NavbarDropdownMenu />
        </section>
      </section>
    </main>
  );
}
