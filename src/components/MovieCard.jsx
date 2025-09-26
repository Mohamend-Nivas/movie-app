import React from "react";

export default function GenreFilter({ genres, current, setSearchParams }) {
  const curSet = new Set(
    (current || "").split(",").filter(Boolean).map(Number)
  );

  const toggle = (id) => {
    const newSet = new Set(curSet);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);

    const val = Array.from(newSet).join(",");

    setSearchParams((prev) => {
      const obj = Object.fromEntries(prev.entries());
      obj.genres = val;
      obj.page = "1"; 
      return obj;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start p-2">
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => toggle(g.id)}
          className={`
            px-4 py-2 rounded-lg text-sm md:text-base font-medium
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              curSet.has(g.id)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
          `}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
