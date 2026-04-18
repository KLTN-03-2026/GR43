import { apiClient } from './apiClient';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await apiClient.post('/api/auth/register', { username, email, password });
    return response.data;
  },

  verifyEmail: async (email: string, token: string) => {
    const response = await apiClient.post('/api/auth/verify-email', { email, token });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email: string, token: string, newPassword: string) => {
    const response = await apiClient.post('/api/auth/reset-password', {
      email,
      resetToken: token,
      newPassword
    });
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await apiClient.post('/api/auth/resend-verification', { email });
    return response.data;
  },
  
  verifyResetToken: async (email: string, token: string) => {
    const response = await apiClient.post('/api/auth/verify-reset-token', { email, token });
    return response.data;
  }
};
