import axios from 'axios';

// Tạo instance Axios cơ bản
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;