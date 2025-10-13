import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieFilters from './components/MovieFilters';
import FavoritesPage from './components/FavoritesPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import MovieModal from './components/MovieModal';
import { searchMovies, getPopularMovies, getMovieDetails } from './services/movieApi';
import { FavoritesProvider } from './context/FavoritesContext';
import {useDebounce} from './hooks/useDebounce';

function MovieApp() {
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
  const [activeTab, setActiveTab] = useState('discover');
  const [filters, setFilters] = useState({
    genres: [],
    year: '',
    minRating: 0
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Load popular movies when app starts
  useEffect(() => {
    if (activeTab === 'discover') {
      loadPopularMovies();
    }
  }, [activeTab]);

  // Handle debounced search
  useEffect(() => {
    if (debouncedSearchQuery && activeTab === 'discover') {
      handleSearch(debouncedSearchQuery, 1);
    } else if (debouncedSearchQuery === '' && activeTab === 'discover') {
      loadPopularMovies();
    }
  }, [debouncedSearchQuery, activeTab]);

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
      setMovieDetails(movie);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, you'd apply these filters to the API call
    console.log('Filters applied:', newFilters);
  };

  const hasMore = currentPage < totalPages && activeTab === 'discover';

  return (
    <div className="App">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="app-tabs">
        <button 
          className={`tab ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}
        >
          🎬 Discover
        </button>
        <button 
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ Favorites
        </button>
      </div>

      {activeTab === 'discover' && (
        <>
          <SearchBar onSearch={setSearchQuery} />
          <MovieFilters 
            onFilterChange={handleFilterChange} 
            currentFilters={filters}
          />
          
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
        </>
      )}

      {activeTab === 'favorites' && (
        <FavoritesPage onMovieClick={handleMovieClick} />
      )}

      <MovieModal 
        movie={movieDetails || selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

// Wrap with Error Boundary and Context Providers
function App() {
  return (
    
      <FavoritesProvider>
        <MovieApp />
      </FavoritesProvider>

  );
}

export default App;