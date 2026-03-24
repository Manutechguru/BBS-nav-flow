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

  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  if (response.data.refreshToken) {
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }

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

  if (response?.data?.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  if (response?.data?.refreshToken) {
    localStorage.setItem("refreshToken", response.data.refreshToken);
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