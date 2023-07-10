import { useState, useEffect } from "react";

import {
  NavBar,
  Logo,
  Search,
  NumResults,
  Main,
  Box,
  MovieList,
  WatchedSummary,
  WatchedMovieList,
  MovieDetails,
  Loader,
  ErrorMessage,
} from "./components";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [movieID, setMovieID] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAddWatchedMovie(movie) {
    setWatchedMovies((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatchedMovies((movies) =>
      movies.filter((movie) => movie.imdbID !== movieId)
    );
  }

  function handleSetMovieId(movieId) {
    setMovieID((selectedId) => (movieId === selectedId ? null : movieId));
  }

  function handleCloseMovie(movieId) {
    setMovieID("");
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  //addition watched to LocalStorage
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSetMovieID={handleSetMovieId} />
          )}
        </Box>
        <Box>
          {movieID ? (
            <MovieDetails
              movieID={movieID}
              API_KEY={API_KEY}
              watched={watchedMovies}
              onSetMovieID={setMovieID}
              onAddMovie={handleAddWatchedMovie}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <WatchedMovieList
                watched={watchedMovies}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
