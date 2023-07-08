import { useEffect, useState } from "react";

import { Loader, ErrorMessage, StarRating } from "../components";

function MovieDetails({
  movieID,
  watched,
  onSetMovieID,
  onAddMovie,
  onCloseMovie,
  API_KEY,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movieID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddMovie(newWatchedMovie);
    onCloseMovie(movieID);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        console.log(data);
        setMovie(data);

        setIsLoading(false);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
    return () => controller.abort();
  }, [movieID, API_KEY]);

  //changing document title
  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  //exit from details by Escape button
  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={() => onSetMovieID("")}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie <span>⭐</span>
                  {watchedUserRating}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
