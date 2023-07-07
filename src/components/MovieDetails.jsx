function MovieDetails({ onSetMovieID }) {
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => onSetMovieID("")}>
          &larr;
        </button>
        <img src={""} alt={""} />
        <div className="details-overview">
          <h2>Title</h2>
          <p>released &bull; runtime</p>
          <p>genre</p>
          <p>
            <span>⭐</span>
            rating IMDb rating
          </p>
        </div>
      </header>
    </div>
  );
}

export default MovieDetails;
