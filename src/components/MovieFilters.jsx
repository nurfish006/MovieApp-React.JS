import React, { useState } from 'react';

const MovieFilters = ({ onFilterChange, currentFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleGenreToggle = (genreId) => {
    const newGenres = currentFilters.genres.includes(genreId)
      ? currentFilters.genres.filter(id => id !== genreId)
      : [...currentFilters.genres, genreId];
    
    onFilterChange({ ...currentFilters, genres: newGenres });
  };

  const handleYearChange = (year) => {
    onFilterChange({ ...currentFilters, year });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...currentFilters, minRating: rating });
  };

  const clearFilters = () => {
    onFilterChange({ genres: [], year: '', minRating: 0 });
  };

  const hasActiveFilters = currentFilters.genres.length > 0 || 
                          currentFilters.year || 
                          currentFilters.minRating > 0;

  return (
    <div className="movie-filters">
      <button 
        className="filters-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🎛️ Filters {hasActiveFilters && '•'}
      </button>

      {isOpen && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filter Movies</h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            )}
          </div>

          {/* Genre Filters */}
          <div className="filter-group">
            <label>Genres</label>
            <div className="genre-tags">
              {genres.map(genre => (
                <button
                  key={genre.id}
                  className={`genre-tag ${currentFilters.genres.includes(genre.id) ? 'active' : ''}`}
                  onClick={() => handleGenreToggle(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="filter-group">
            <label>Release Year</label>
            <select 
              value={currentFilters.year} 
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <label>Minimum Rating: {currentFilters.minRating}+</label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={currentFilters.minRating}
              onChange={(e) => handleRatingChange(Number(e.target.value))}
              className="rating-slider"
            />
            <div className="rating-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilters;