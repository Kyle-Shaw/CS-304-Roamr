import axios from 'axios';

//This class handles axios requests for the backend.

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

export default api;