import { Link } from "wouter";

export function NavbarDropdownMenu() {
  return (
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-square btn-neutral">
        <i className="fa-solid fa-ellipsis" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 shadow-xl gap-1"
      ></ul>
    </div>
  );
}

export function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/" className="btn btn-primary ">
            SearchPaper
          </Link>
        </div>

        <div className="navbar-end">
          <NavbarDropdownMenu />
        </div>
      </nav>
    </>
  );
}
