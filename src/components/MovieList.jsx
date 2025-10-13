import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, hasMore, onLoadMore, loadingMore }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
      
      {hasMore && (
        <div className="load-more-container">
          <button 
            onClick={onLoadMore} 
            className="load-more-btn"
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More Movies'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;