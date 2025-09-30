const API_KEY = 'your_api_key_here'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to handle API errors
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
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

// Get movie details by ID (for future use)
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`);
  }
};