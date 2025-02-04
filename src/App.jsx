import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

const fetchData = async ({ queryKey }) => {
  console.log("fetch data is called in app");

  const page = queryKey[1]; //
  const moviesList = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&page=${page}`
    // { headers : { } },
  );
  return moviesList.data.results;
};

function App() {
  const [page, setPage] = useState(1);

  const [watchList, setWatchList] = useState([]);

  const {
    data: moviesList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["moviesList", page],
    queryFn: fetchData,
    placeholderData: (previousData) => previousData,
  });

  const addToWatchList = (movieObj) => {
    console.log("add to watch list is called in app");
    setWatchList([...watchList, movieObj]);
    localStorage.setItem("watchList", JSON.stringify(watchList));
  };

  const removeFromWatchList = (movieObj) => {
    console.log("removeFromWatchList list is called in app");

    const newWatchList = watchList.filter((watchListItem) => {
      return watchListItem.id != movieObj.id;
    });
    setWatchList(newWatchList);
  };

  useEffect(() => {
    console.log("i am called useeffect app");

    const localWatchList = localStorage.getItem("watchList");
    if (localWatchList) {
      setWatchList(JSON.parse(localWatchList));      
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                moviesList={moviesList}
                error={error}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                setWatchList={setWatchList}
                watchList={watchList}
                addToWatchList={addToWatchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchList={watchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
