// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081", // URL de tu servidor FastAPI
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // ponlo en true si usas sesiones/cookies
});

export const getComponentsApi = async () => {
  try {
    const response = await apiClient.get("/getComponents");
    return response.data;
  } catch (error) {
    console.error("Error fetching components:", error);
    throw error;
  }
};

export const activeComponentApi = async (componentName: string) => {
  try {
    const response = await apiClient.put("/activeComponent/" + componentName, {
      componentName,
    });
    return response.data;
  } catch (error) {
    console.error("Error activating component:", error);
    throw error;
  }
};
