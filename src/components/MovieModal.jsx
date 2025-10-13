import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const MovieModal = ({ movie, isOpen, onClose }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  if (!isOpen || !movie) return null;

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/1e272e/8899a6?text=No+Poster';

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div 
          className="modal-header"
          style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
        >
          <div className="modal-poster">
            <img src={posterUrl} alt={movie.title} />
            <button 
              className={`modal-favorite-btn ${favorite ? 'favorited' : ''}`}
              onClick={handleFavoriteClick}
            >
              {favorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
          <div className="modal-header-info">
            <h2>{movie.title}</h2>
            <div className="modal-meta">
              <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
              <span className="year">{movie.release_date?.split('-')[0]}</span>
              <span className="runtime">{movie.runtime} min</span>
            </div>
            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <h3>Overview</h3>
          <p>{movie.overview || 'No overview available.'}</p>
          
          <div className="movie-details">
            <div className="detail-item">
              <strong>Budget:</strong> 
              <span>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</span>
            </div>
            <div className="detail-item">
              <strong>Revenue:</strong> 
              <span>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</span>
            </div>
            <div className="detail-item">
              <strong>Status:</strong> 
              <span>{movie.status || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;