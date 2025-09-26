import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const deb = useDebounce(q, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (deb && deb.length > 1) {
      navigate({
        pathname: "/",
        search: createSearchParams({ query: deb, page: "1" }).toString(),
      });
    } else if (deb === "") {
      navigate("/");
    }
  }, [deb]);

  return (
    <div className="p-4 pt-1">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies..."
        className="z-40 p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-14 left-1/2 transform -translate-x-1/2"
      />
    </div>
  );
}
