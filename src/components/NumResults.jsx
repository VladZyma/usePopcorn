function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> movies
    </p>
  );
}

export default NumResults;
