import { Link } from "react-router-dom";

export default function Navbar({ onToggleFilter }) {
  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">MovieApp</Link>

        {/* Right buttons */}
        <div className="flex items-center gap-4">

{/* Watchlist always visible */}
          <Link to="/watchlist" className="hover:text-red-400 font-medium">Watchlist</Link>

          {/* Menu icon for mobile filter */}
          <button
            className="md:hidden focus:outline-none"
            onClick={onToggleFilter}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          
        </div>
      </div>
    </nav>
  );
}
