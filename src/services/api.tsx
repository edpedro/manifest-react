// import axios, { AxiosInstance } from "axios";

// let apiInstance: AxiosInstance | null = null;

// export const createApiInstance = () => {
//   if (apiInstance) return apiInstance;

//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_URL || "",
//   });

//   // Adiciona interceptors apenas uma vez
//   instance.interceptors.request.use(
//     (config) => {
//       const tokenString = localStorage.getItem("@token");
//       if (tokenString) {
//         const tokenParsed = JSON.parse(tokenString);
//         config.headers.authorization = `Bearer ${tokenParsed.token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   apiInstance = instance;
//   return instance;
// };

// const api = createApiInstance();
// export default api;

// api.ts

//correta

// import axios, { AxiosInstance, AxiosHeaders } from "axios";

// let apiInstance: AxiosInstance | null = null;

// export const createApiInstance = () => {
//   if (apiInstance) return apiInstance;

//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_URL || "",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // Request interceptor
//   instance.interceptors.request.use(
//     (config) => {
//       const tokenString = localStorage.getItem("@token");

//       if (tokenString) {
//         try {
//           const tokenData = JSON.parse(tokenString);
//           const token =
//             typeof tokenData === "object" && tokenData !== null
//               ? tokenData.token
//               : tokenData;

//           if (token) {
//             // Create new AxiosHeaders instance
//             const headers = new AxiosHeaders(config.headers);
//             headers.set("Authorization", `Bearer ${token}`);
//             config.headers = headers;
//           }
//         } catch (error) {
//           console.error("Error parsing token:", error);
//         }
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Response interceptor
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         // Clear invalid token
//         localStorage.removeItem("@token");
//         localStorage.removeItem("@data");

//         // Redirect to login if in browser
//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   apiInstance = instance;
//   return instance;
// };

// const api = createApiInstance();
// export default api;

// import axios, { AxiosInstance, AxiosHeaders } from "axios";

// let apiInstance: AxiosInstance | null = null;

// // Configuração do atraso (em milissegundos)
// const API_DELAY = 3000; // 1 segundo de atraso

// export const createApiInstance = () => {
//   if (apiInstance) return apiInstance;

//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_URL || "",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // Request interceptor
//   instance.interceptors.request.use(
//     (config) => {
//       const tokenString = localStorage.getItem("@token");

//       if (tokenString) {
//         try {
//           const tokenData = JSON.parse(tokenString);
//           const token =
//             typeof tokenData === "object" && tokenData !== null
//               ? tokenData.token
//               : tokenData;

//           if (token) {
//             const headers = new AxiosHeaders(config.headers);
//             headers.set("Authorization", `Bearer ${token}`);
//             config.headers = headers;
//           }
//         } catch (error) {
//           console.error("Error parsing token:", error);
//         }
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Response interceptor com atraso
//   instance.interceptors.response.use(
//     (response) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(response);
//         }, API_DELAY);
//       });
//     },
//     (error) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           const originalRequest = error.config;

//           if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             localStorage.removeItem("@token");
//             localStorage.removeItem("@data");

//             if (typeof window !== "undefined") {
//               window.location.href = "/login";
//             }
//           }

//           reject(error);
//         }, API_DELAY);
//       });
//     }
//   );

//   apiInstance = instance;
//   return instance;
// };

// const api = createApiInstance();
// export default api;

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

  // Interceptor de requisição
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
