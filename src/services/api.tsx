import axios, { AxiosInstance, AxiosHeaders } from "axios";

let apiInstance: AxiosInstance | null = null;

export const createApiInstance = () => {
  if (apiInstance) return apiInstance;

  const instance = axios.create({
    baseURL: import.meta.env.VITE_URL || "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const tokenString = localStorage.getItem("@token");

      if (tokenString) {
        try {
          const tokenData = JSON.parse(tokenString);
          const token =
            typeof tokenData === "object" && tokenData !== null
              ? tokenData.token
              : tokenData;

          if (token) {
            const headers = new AxiosHeaders(config.headers);
            headers.set("Authorization", `Bearer ${token}`);
            config.headers = headers;
          }
        } catch (error) {
          console.error("Error parsing token:", error);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de resposta (com verificação para evitar loops)
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      // Verificar se é erro 401 e ainda não tentou repetir a requisição
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Remover dados de autenticação
        localStorage.removeItem("@token");
        localStorage.removeItem("@data");

        // Redirecionar apenas se não estiver na página de login ou registro
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          if (
            currentPath !== "/login" &&
            currentPath !== "/register" &&
            !currentPath.includes("/auth")
          ) {
            window.location.href = "/login";
          }
        }
      }

      return Promise.reject(error);
    }
  );

  apiInstance = instance;
  return instance;
};

const api = createApiInstance();
export default api;
