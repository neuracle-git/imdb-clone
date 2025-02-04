import React, { useEffect, useState } from "react";
import GenreList from "../utility/GenreList";

function Watchlist({ watchList, removeFromWatchList }) {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genre");

  const [watchGenreList, setwatchGenreList] = useState([]);

  useEffect(() => {
    console.log("I am called use effect watchlist");

    let tmp = watchList.map((movieObj) => {
      return GenreList[movieObj.genre_ids[0]];
    });
    setwatchGenreList([...new Set(["All Genre", ...tmp])]);
  }, [watchList]);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-4 mt-8 mb-8 justify-center">
        {watchGenreList.map((genre, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSelectedGenre(genre)}
              className={
                selectedGenre != genre
                  ? "btn btn-gray w-24"
                  : "btn btn-primary w-24"
              }
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="mt-8 mb-8 text-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-auto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>S.No</th>
            <th>Poster</th>
            <th>Name</th>
            <th>Voting Average</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {watchList
            .filter((movieObj) => {
              if (selectedGenre == "All Genre") {
                return true;
              }
              return GenreList[movieObj.genre_ids[0]] === selectedGenre;
            })
            .filter((movieObj) => {
              return movieObj.original_title
                .toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((movieObj, idx) => {
              return (
                <tr key={idx} className="hover">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.original_title}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{movieObj.original_title}</td>
                  <td>{movieObj.vote_average}</td>
                  <td>{GenreList[movieObj.genre_ids[0]]}</td>
                  <td>
                    <button
                      className="bg bg-warning"
                      onClick={() => removeFromWatchList(movieObj)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {/* row */}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
