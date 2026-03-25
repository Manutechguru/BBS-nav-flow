import { api } from "./api";

/* =========================
   TYPES
========================= */
type LoginResponse = {
  flow: string;
  data: {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      username: string;
      role: string;
      role_id: string;
      client_id?: string;
      user_type: string;
    };
  };
};

/* =========================
   PASSWORD LOGIN
========================= */
export const loginWithPassword = async (
  identifier: string,
  password: string
) => {
  const res = await api.post<LoginResponse>("/auth/login", {
    identifier,
    password,
  });

  const response = res.data;

  if (!response?.data?.user) {
    throw new Error("Invalid login response");
  }

  // 🔥 CLEAR OLD TOKENS FIRST
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    console.warn("⚠️ No refresh token received from backend");
  }

  // 🔥🔥🔥 THIS IS THE MISSING PIECE
  localStorage.setItem("identifier", identifier);
  localStorage.setItem("password", password);

  return response.data.user;
};

/* =========================
   SEND OTP (LOGIN)
========================= */
export const sendLoginOtp = async (phone: string) => {
  const res = await api.post("/auth/send-otp", {
    phone,
  });

  return res.data;
};

/* =========================
   VERIFY OTP LOGIN
========================= */
export const verifyLoginOtp = async (phone: string, otp: string) => {
  const res = await api.post<LoginResponse>("/auth/verify-otp", {
    phone,
    otp,
  });

  const response = res.data;

  if (!response?.data?.user) {
    throw new Error("Invalid OTP login response");
  }

  // 🔥 CLEAR OLD TOKENS FIRST
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    console.warn("⚠️ No refresh token received from backend");
  }

  return response.data.user;
};

/* ============================================================
   🔥 RESET PASSWORD FLOW (NEW - PROPER IMPLEMENTATION)
============================================================ */

/* =========================
   SEND RESET OTP
========================= */
export const sendResetOtp = async (identifier: string) => {
  const res = await api.post("/auth/forgot-password", {
    identifier,
  });
  return res.data;
};

/* =========================
   VERIFY RESET OTP
========================= */
export const verifyResetOtp = async (phone: string, otp: string) => {
  const res = await api.post("/auth/verify-reset-otp", {
    phone,
    otp,
  });

  return res.data;
};

/* =========================
   FINAL RESET PASSWORD
========================= */
export const resetPassword = async (
  phone: string,
  otp: string,
  newPassword: string
) => {
  const res = await api.post("/auth/reset-password", {
    phone,
    otp,
    newPassword,
  });

  return res.data;
};