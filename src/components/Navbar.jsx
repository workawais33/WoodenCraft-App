import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Cart", path: "/cart" },
  ];

  const linkClasses = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-emerald-50 font-semibold text-emerald-700"
        : "text-stone-600 hover:bg-stone-100 hover:text-emerald-700"
    }`;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-50 px-4 py-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
              <img
                src="https://images.openai.com/static-rsc-4/J26BjliocyyJJCHhJ51tSiBv4cVfRAyJl-CUZ8y7Ki__qz_aytx5nm6OpiU0UdpeDy2GwjhuFwMGiWg7OHdM2Pox_fgGzP6twgmOXvlwOXFvG0nITF3L7WfPLBrCgGQXc4YKb7Ac6Fks1yH7Bmx0_q-OIHL0b7FlyQKVY174L527jf5wyA8dKkSHCUMY3A-h?purpose=fullsize"
                alt="Wooden Craft logo"
                className="h-full w-full object-cover"
              />
            </span>

            <div>
              <span className="block text-lg font-bold leading-none tracking-tight text-stone-900">
                Wooden Craft
              </span>

              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                Handcrafted Living
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClasses}>
                {link.name}
              </NavLink>
            ))}

            <div className="h-6 w-px bg-stone-200" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-stone-500">Welcome</p>
                  <p className="max-w-32 truncate text-sm font-bold text-stone-900">
                    {user.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-stone-900"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:shadow-md"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-stone-200 text-stone-700 transition-colors hover:bg-stone-100 md:hidden"
          >
            <span className="text-xl">{isMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-stone-200 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-emerald-50 font-semibold text-emerald-700"
                        : "text-stone-700 hover:bg-stone-100"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="my-2 h-px bg-stone-200" />

              {isAuthenticated ? (
                <>
                  <div className="rounded-xl bg-emerald-50 px-4 py-3">
                    <p className="text-xs text-stone-500">Signed in as</p>
                    <p className="mt-1 font-bold text-stone-900">{user.name}</p>
                    <p className="mt-1 text-xs text-stone-500">{user.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer rounded-xl px-4 py-3 text-left font-semibold text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-100"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl bg-emerald-700 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-800"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;