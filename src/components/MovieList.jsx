import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;