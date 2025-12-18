import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login.html';
    }
    return Promise.reject(error);
  }
);

// 인증 API
export const auth = {
  signup: (email, password) => api.post('/auth/signup', { email, password }),
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success && response.data.data.session) {
      localStorage.setItem('access_token', response.data.data.session.access_token);
    }
    return response;
  },
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('access_token');
  },
};

// 시간표 API
export const timetables = {
  getAll: () => api.get('/timetables'),
  create: (data) => api.post('/timetables', data),
  update: (id, data) => api.put(`/timetables/${id}`, data),
  delete: (id) => api.delete(`/timetables/${id}`),
};

// 일정 API
export const schedules = {
  getAll: () => api.get('/schedules'),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
};

export default api;
