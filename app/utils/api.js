import axios from "axios";

// Configura la instancia de Axios con la URL base de tu API
const api = axios.create({
  baseURL: "https://api.ejemplo.com", // Reemplaza con la URL base de tu API
  timeout: 5000, // Timeout de 5 segundos para todas las peticiones
  headers: {
    "Content-Type": "application/json",
  },
});

// Puedes configurar interceptores para manejar peticiones o respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globalmente
    console.error(error);
    return Promise.reject(error);
  },
);

export default api;
