import { Movie } from "../components";

function MovieList({ movies, onSetMovieID }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSetMovieID={onSetMovieID} />
      ))}
    </ul>
  );
}

export default MovieList;
