import axios, { AxiosInstance } from "axios";
import { useLoading } from "../contexts/hooks/Loanding";

interface UItoken {
  token: undefined | string;
}

const useApi = () => {
  const { setLoadingFetch } = useLoading();

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("@token");
      if (token) {
        const _token: UItoken = JSON.parse(token);
        config.headers.authorization = `Bearer ${_token}`;
      }
      setLoadingFetch(true);
      return config;
    },
    (error) => {
      setLoadingFetch(false);
      console.error(error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoadingFetch(false);
      return response;
    },
    async (error) => {
      setLoadingFetch(false);

      if (error.response.status === 401) {
        localStorage.clear();
        if (error.config.headers) {
          error.config.headers.authorization = undefined;
        }
        window.location.href = "/login";
      }
      console.error(error);
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
