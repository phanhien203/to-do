import axios from 'axios';

const baseApi = axios.create({
  baseURL: (window as any)?.CONFIG?.BASE_URL,
  timeout: 10000,
});

export default baseApi;
