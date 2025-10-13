import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from './MovieList';

const FavoritesPage = ({ onMovieClick }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleMovieClick = (movie) => {
    onMovieClick(movie);
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-state">
          <h2>🌟 No Favorites Yet</h2>
          <p>Start adding movies to your favorites by clicking the heart icon!</p>
          <div className="empty-illustration">🎬❤️</div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>Your Favorite Movies</h2>
        <p className="favorites-count">{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}</p>
      </div>
      <MovieList 
        movies={favorites} 
        onMovieClick={handleMovieClick}
      />
    </div>
  );
};

export default FavoritesPage;