import axios from 'axios'

// 創建 axios 實例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173/api',
  // baseURL: 'https://myproject-814320709930.asia-east1.run.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    // 可以在這裡添加認證 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 響應攔截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API 錯誤:', error)
    return Promise.reject(error)
  }
)

export default api
