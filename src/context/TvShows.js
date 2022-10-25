import { createContext, useState, useEffect } from "react";

const TvShowsContext = createContext();

const TvShowsProvider = ({ children }) => {
  const [tvShows, setTvShows] = useState([]);
  const [query, setQuery] = useState("breaking bad");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://tv-shows-app.rsbkme.workers.dev/search?q=${query}`)
      // fetch(`http://127.0.0.1:8787/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setTvShows(data))
      .then(() => setLoading(false));
  }, [query]);

  return (
    <TvShowsContext.Provider
      value={{ tvShows, setTvShows, query, setQuery, loading }}
    >
      {children}
    </TvShowsContext.Provider>
  );
};

export { TvShowsContext, TvShowsProvider };
