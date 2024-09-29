import axios from "axios";

const url = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjlmMDg1MDZkY2MwMDAwMjJkMWJkNWU0NzUwNTJkOCIsIm5iZiI6MTcyNzYwMDc1Ny42OTU5MTcsInN1YiI6IjY2ZjkxN2NjMGY2ZmEyY2ZjZTVmNjZhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N6Uo0RGwl969olxEkuZ70q8uv1Sfi8o9A-IdKtCPzjY'
  }
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${url}/trending/movie/day?language=en-US`, options);
  return response.data.results;
};

export const searchMovies = async query => {
  const params = {
    ...options,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  }
  const response = await axios.get(`${url}/search/movie`, params);
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`${url}/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(`${url}/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`${url}/movie/${movieId}/reviews`, options);
  return response.data.results;
};