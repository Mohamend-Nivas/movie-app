// src/hooks/useWatchlist.js

const STORAGE_KEY = "watchlist";

export const getWatchlist = () => {
  const list = localStorage.getItem(STORAGE_KEY);
  return list ? JSON.parse(list) : [];
};

export const saveWatchlist = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const isInWatchlist = (id) => {
  const list = getWatchlist();
  return list.some((m) => m.id === id);
};

export const getCountInWatchlist = (id) => {
  const list = getWatchlist();
  const item = list.find((m) => m.id === id);
  return item ? item.count : 0;
};

export const addToWatchlist = (movie) => {
  const list = getWatchlist();
  const existing = list.find((m) => m.id === movie.id);

  if (existing) {
    existing.count += 1; // increment
  } else {
    list.push({ ...movie, count: 1 });
  }

  saveWatchlist(list);
};

export const removeFromWatchlist = (id) => {
  let list = getWatchlist();
  const existing = list.find((m) => m.id === id);

  if (existing) {
    existing.count -= 1;
    if (existing.count <= 0) {
      // remove movie if count is 0
      list = list.filter((m) => m.id !== id);
    }
  }

  saveWatchlist(list);
};
