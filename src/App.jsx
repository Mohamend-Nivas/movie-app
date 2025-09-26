import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Fixed SearchBox below Navbar */}
      <SearchBox />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pt-30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          {/* optional: <Route path="/movie/:id" element={<MovieDetails/>} /> */}
        </Routes>
      </main>
    </div>
  );
}
