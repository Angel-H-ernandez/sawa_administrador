// src/services/apiClient.ts

import axios from "axios";
import { Cog } from "lucide-react";
import { Result } from "postcss";

const apiClient = axios.create({
  baseURL: "https://sawapi.up.railway.app/api", // URL base de la API
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para obtener los datos de usuario
export const fetchUsuarios = async () => {
  try {
    const response = await apiClient.get("/list-users");
    return response.data; // Aquí se asume que la respuesta es un array de usuarios
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    throw error; // Manejo del error, puedes adaptarlo a tus necesidades
  }
};

export const cambiarEsstadoUsuario = async () => {
  try{
    const response = await apiClient.put("/update-users")
  }
}
