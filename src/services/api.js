import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para datos XM
export const xmService = {
  fetchData: async (params) => {
    return api.get('xm-data/', { params });
  },
  fetchVisualizations: async (params) => {
    return api.get('xm-data/visualizations/', { params })
  },
  trainModel: async (payload) => {
    return api.post('predictions/train/', payload)
  },
  
  getPredictions: async (params) => {
    return api.get('predictions/predict/', { params })
  },
  
  getStatistics: async (params) => {
    return api.get('xm-data/statistics/', { params })
  }
}

// Servicios para predicciones
export const predictionService = {
  predict: async (payload) => {
    return api.post('predictions/predict/', payload);
  },
  getLatestPredictions: async (params) => {
    return api.get('predictions/get_latest_predictions/', { params });
  },
  compareModels: async (payload) => {
    return api.post('predictions/compare_models/', payload);
  }
};

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);