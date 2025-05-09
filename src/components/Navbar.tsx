import { Link } from "wouter";

export function NavbarDropdownMenu() {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <i className="fa-solid fa-bars"></i>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      ></ul>
    </div>
  );
}

export function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-start">
          <Link to="/" className="btn btn-primary font-normal">
            SearchPaper
          </Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <NavbarDropdownMenu />
        </div>
      </nav>
    </>
  );
}
