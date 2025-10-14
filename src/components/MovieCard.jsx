// src/components/MovieCard.jsx
import React, { useState, useEffect } from "react";
import { imgUrl } from "../api/tmdb";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "../hooks/useWatchlist";

export default function MovieCard({ movie }) {
  const [inList, setInList] = useState(isInWatchlist(movie.id));

  useEffect(() => {
    setInList(isInWatchlist(movie.id));
  }, [movie.id]);

  const toggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
    setInList(isInWatchlist(movie.id));
  };

  if (!movie) return null;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow relative">
      <img
        src={imgUrl(movie.poster_path, "w300")}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <button
        onClick={toggleWatchlist}
        className="absolute top-2 right-2 text-xl text-red-500"
      >
        {inList ? <FaHeart /> : <FaRegHeart />}
      </button>
      <div className="p-3">
        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </div>
  );
}
