function WatchedSummary({ watched }) {
  const getAverage = (arr) => {
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  };

  const avgIMDbRating = getAverage(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);

  const avgUserRating = getAverage(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);

  const avgRunTime = getAverage(watched.map((movie) => movie.runtime)).toFixed(
    1
  );

  return (
    <div className="summary">
      <h2> Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgIMDbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRunTime}</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
