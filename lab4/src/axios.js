import axios from "axios";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:5173/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const user = auth.currentUser;
        if (user) {
          const refreshedToken = await user.getIdToken(true);
          localStorage.setItem("accessToken", refreshedToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${refreshedToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
          return api(originalRequest);
        } else {
          signOut(auth);
          window.location.href = "/login";
        }
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
