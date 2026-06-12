import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

const axiosClient = axios.create({
  // Delegamos el ruteo real al proxy o URL base inyectada
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar Token Firebase
axiosClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      // Obtenemos token JWT
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejo global de errores
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o no autorizada.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
