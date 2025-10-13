import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import MovieModal from './components/MovieModal';
import { searchMovies, getPopularMovies, getMovieDetails } from './services/movieApi';
import useDebounce from './hooks/useDebounce';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Load popular movies when app starts
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Handle debounced search
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery, 1);
    } else if (debouncedSearchQuery === '') {
      loadPopularMovies();
    }
  }, [debouncedSearchQuery]);

  const loadPopularMovies = async (page = 1) => {
    if (page === 1) setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies(page);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    if (page === 1) setLoading(true);
    setError(null);
    
    try {
      const data = await searchMovies(query, page);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setCurrentPage(page);
      setSearchQuery(query);
      
      if (data.results.length === 0 && page === 1) {
        setError(`No movies found for "${query}"`);
      }
    } catch (err) {
      setError(err.message);
      if (page === 1) setMovies([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      
      if (searchQuery) {
        handleSearch(searchQuery, nextPage);
      } else {
        loadPopularMovies(nextPage);
      }
    }
  };

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    
    try {
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (err) {
      console.error('Failed to load movie details:', err);
      setMovieDetails(movie); // Fallback to basic movie info
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  const hasMore = currentPage < totalPages;

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => searchQuery ? handleSearch(searchQuery) : loadPopularMovies()} 
        />
      )}
      
      <MovieList 
        movies={movies}
        onMovieClick={handleMovieClick}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />

      <MovieModal 
        movie={movieDetails || selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;