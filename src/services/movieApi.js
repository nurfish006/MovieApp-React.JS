// api/tmdb.js (or whatever your file is named)

// Get API key from environment variables (Vite uses import.meta.env)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Validate environment variables
if (!API_KEY || API_KEY === 'your_actual_tmdb_api_key_here') {
  console.error('TMDB API key is missing. Please check your .env file');
}

if (!BASE_URL) {
  console.error('TMDB BASE_URL is missing. Please check your .env file');
}

// Helper function to handle API errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API error: ${response.status} - ${errorData.status_message || response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to search movies: ${error.message}`);
  }
};

// Get popular movies (for initial page load)
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch popular movies: ${error.message}`);
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  if (!movieId) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`);
  }
};

// Get now playing movies
export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch now playing movies: ${error.message}`);
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch top rated movies: ${error.message}`);
  }
};

// Get movie images
export const getMovieImages = async (movieId) => {
  if (!movieId) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch movie images: ${error.message}`);
  }
};