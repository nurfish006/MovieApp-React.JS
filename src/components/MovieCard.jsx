import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}/10</p>
      <p>Released: {movie.release_date}</p>
    </div>
  );
};

export default MovieCard;