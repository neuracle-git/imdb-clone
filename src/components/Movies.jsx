import React from "react";

function Movies({
  moviesList,
  error,
  isLoading,
  page,
  setPage,
  watchList,
  addToWatchList,
  removeFromWatchList,
}) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Loading...</p>;

  const goToNextPage = () => {
    console.log("next");
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    console.log("prev");
    setPage(page - 1);
  };

  const existInWatchList = (movieObj) => {
    console.log("I am called use existInWatchList");

    if (
      watchList.some(
        (watchObj) => JSON.stringify(movieObj) === JSON.stringify(watchObj)
      )
    ) {
      console.log("found in watchlist");

      return true;
    }
    return false;
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-4 mb-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={goToPreviousPage}
            disabled={page == 1}
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button className="join-item btn" onClick={goToNextPage}>
            »
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 m-4">
        {moviesList.map((movieObj) => {
          return (
            <div
              key={movieObj.id}
              className="card bg-base-100 shadow-sm w-full"
            >
              <figure>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                  alt={movieObj.original_title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{movieObj.title}</h2>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {movieObj.overview}
                </p>
                <div className="card-actions text-center md:block">
                  {existInWatchList(movieObj) ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => removeFromWatchList(movieObj)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToWatchList(movieObj)}
                    >
                      Add to Watchlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
