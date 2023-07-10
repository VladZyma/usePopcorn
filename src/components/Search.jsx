import { useRef } from "react";
import { useKey } from "../hooks/useKey";

function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);

  //focus on search input by clicking 'Enter' button
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    onSetQuery("");
  });

  return (
    <input
      className="search"
      ref={inputEl}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

export default Search;
