import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

/* =========================
   🔐 REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   🔄 RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
  error?.response?.status === 401 &&
  !originalRequest._retry &&
  !originalRequest.url.includes("/auth/login") // 🔥 ADD THIS
){
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        /* =========================================
           🔥 CASE 1: REFRESH TOKEN EXISTS
        ========================================= */

        if (refreshToken) {
          const res = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            { refreshToken }
          );

          console.log("REFRESH RESPONSE:", res.data);

          const newAccessToken = res.data.data?.accessToken;
          const newRefreshToken = res.data.data?.refreshToken;

          if (!newAccessToken) {
            throw new Error("Invalid refresh response");
          }

          localStorage.setItem("accessToken", newAccessToken);

          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }

        /* =========================================
           🔥 CASE 2: NO REFRESH TOKEN → SILENT LOGIN
        ========================================= */

        console.warn("⚠️ No refresh token → attempting silent re-login");

        const identifier = localStorage.getItem("identifier");
        const password = localStorage.getItem("password");

// 🔥 ONLY do silent login if password exists
        if (!identifier || !password) {
          console.warn("⚠️ Cannot silent login → redirecting");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          window.location.href = "/"; // go to login

          return Promise.reject(error);
        }

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            identifier,
            password,
          }
        );

        console.log("SILENT LOGIN RESPONSE:", res.data);

        const newAccessToken = res.data.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("Silent login failed");
        }

        localStorage.setItem("accessToken", newAccessToken);

        // retry request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("🔴 Auth recovery failed:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // redirect to login
        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);