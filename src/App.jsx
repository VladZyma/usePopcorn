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
import { useFetchMovies } from "./hooks/useFetchMovies";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const watched = JSON.parse(localStorage.getItem("watched"));
    return watched ? watched : [];
  });
  const [movieID, setMovieID] = useState("");
  const [query, setQuery] = useState("");

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

  //fetching movies
  const { movies, isLoading, error } = useFetchMovies(query);

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
