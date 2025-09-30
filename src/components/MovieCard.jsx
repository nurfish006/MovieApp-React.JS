import React from 'react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg'; // You can add a placeholder image

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterUrl} 
          alt={movie.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750/1e272e/8899a6?text=No+Poster';
          }}
        />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
          <span className="year">{movie.release_date?.split('-')[0]}</span>
        </div>
        <p className="overview">
          {movie.overview?.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};

export default MovieCard;