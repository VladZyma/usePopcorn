import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  className: PropTypes.string,
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  className = "star-rating",
  maxRating = 5,
  defaultRating = 0,
  size = 48,
  color = "#fcc419",
  messages = [],
  onSetRating,
}) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  const starContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const starTextStyle = {
    lineHeight: 1,
    margin: 0,
    fontSize: `${size / 2}px`,
    color,
  };

  const [starRating, setStarRating] = useState(defaultRating);
  const [tempStarRating, setTempStarRating] = useState(0);

  function handleStarRating(rating) {
    setStarRating(rating);
    if (onSetRating) {
      onSetRating(rating);
    }
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i + 1}
            starSize={size}
            starColor={color}
            starRating={starRating}
            full={
              tempStarRating ? tempStarRating >= i + 1 : starRating >= i + 1
            }
            onSetStarRating={() => handleStarRating(i + 1)}
            onHoverIn={() => setTempStarRating(i + 1)}
            onHoverOut={() => setTempStarRating(0)}
          />
        ))}
      </div>
      <span style={starTextStyle}>
        {messages.length === maxRating
          ? messages[tempStarRating ? tempStarRating - 1 : starRating - 1]
          : tempStarRating || starRating || ""}
      </span>
    </div>
  );
}

function Star({
  starSize,
  starColor,
  full,
  onSetStarRating,
  onHoverIn,
  onHoverOut,
}) {
  const starStyle = {
    width: `${starSize}px`,
    height: `${starSize}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onClick={onSetStarRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={starColor}
          stroke={starColor}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={starColor}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
