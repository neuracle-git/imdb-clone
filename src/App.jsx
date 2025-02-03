import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenreList from "./utility/GenreList";

// c09a3c31bd4b40090b42aa6e04000635
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDlhM2MzMWJkNGI0MDA5MGI0MmFhNmUwNDAwMDYzNSIsIm5iZiI6MTczODQyMjYyOS4xMzQsInN1YiI6IjY3OWUzOTY1MTc0MmI0NGExNGNiNDE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XWvxKKC808ALJOvlCsccLdY-9ETcuQq_nm3-DFkbRks
// https://api.themoviedb.org/3/movie/popular?api_key=c09a3c31bd4b40090b42aa6e04000635

const fetchData = async({queryKey}) => {
  console.log(queryKey);
  
  const page = queryKey[1]; //
  const moviesList = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c09a3c31bd4b40090b42aa6e04000635&page=${page}`,
  // { headers : { } },
  );
  return moviesList.data.results;
  
}

function App() {

  const [page,setPage] = useState(1)

  const [watchList, setWatchList] = useState([])
  
  const {data:moviesList , error, isLoading} = useQuery({
    queryKey: ["moviesList",page],
    queryFn: fetchData,
    placeholderData: (previousData) => previousData,
  });

  
  const addToWatchList = (movieObj) => {    
    setWatchList([...watchList , movieObj])
    console.log(watchList);
    localStorage.setItem("watchList",JSON.stringify(watchList))
    console.log(watchList);
  }

  const removeFromWatchList = (movieObj) => {
    const newWatchList = watchList.filter( (watchListItem) => {
        return watchListItem.id != movieObj.id
    } )
    setWatchList(newWatchList)   
    
    
  }

  useEffect(()=>{    
    console.log("i am called 1");
    
    const localWatchList = localStorage.getItem("watchList")
    if (localWatchList){      
      
      setWatchList(JSON.parse(localWatchList))
      console.log(watchList);

    }        
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Movies moviesList={moviesList} error={error} isLoading={isLoading} page={page} setPage={setPage} setWatchList={setWatchList} watchList={watchList} addToWatchList={addToWatchList} removeFromWatchList={removeFromWatchList} />} />
          <Route path="/watchlist" element={<Watchlist watchList={watchList} removeFromWatchList={removeFromWatchList} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
