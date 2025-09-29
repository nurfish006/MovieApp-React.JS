import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <Header />
      <SearchBar />
      {loading && <LoadingSpinner />}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;