import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie, onMovieClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/1e272e/8899a6?text=No+Poster';

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleClick = () => {
    onMovieClick(movie);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img 
          src={posterUrl} 
          alt={movie.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750/1e272e/8899a6?text=No+Poster';
          }}
        />
        <button 
          className={`favorite-btn ${favorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
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