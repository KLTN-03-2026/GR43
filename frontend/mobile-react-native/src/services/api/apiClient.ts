import axios from 'axios';
import Constants from 'expo-constants';
import { Logger } from '../../shared/utils/logger';

// Normalize errors to a standard format
export interface ApiError {
  message: string;
  statusCode?: number;
}

export const apiClient = axios.create({
  // Fallback to JSONPlaceholder for demo purposes
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth tokens, Log Requests
apiClient.interceptors.request.use(
  (config) => {
    // e.g. const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`; // (example)
    Logger.debug(`[API RQ] \${config.method?.toUpperCase()} \${config.url}`);
    return config;
  },
  (error) => {
    Logger.error('[API RQ Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Parse Errors, Log Responses
apiClient.interceptors.response.use(
  (response) => {
    Logger.debug(`[API RS] \${response.config.url} - Status: \${response.status}`);
    return response;
  },
  (error) => {
    const errorObj: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      statusCode: error.response?.status,
    };
    
    Logger.error(`[API RS Error] \${error.config?.url} - \${errorObj.statusCode}: \${errorObj.message}`);
    
    // Auto-logout logic on 401 could go here using Zustand's getState()
    // if (errorObj.statusCode === 401) useAuthStore.getState().logout();

    return Promise.reject(errorObj);
  }
);
