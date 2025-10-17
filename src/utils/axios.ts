import axios from "axios";
import { ENV } from "./config/ENV";
import { getItem, isTokenExpired } from ".";
const baseURL = `${ENV.BASE_URL}/api`;
export const authInstance = axios.create({ baseURL });
export const publicInstance = axios.create({ baseURL });

let onSessionExpired: null | (() => void) = null;

export function setOnSessionExpiredCallback(cb: () => void) {
  onSessionExpired = cb;
}

authInstance.interceptors.request.use(
  (config) => {
    const token = getItem("accessToken");
    if (isTokenExpired(token as string)) {
      onSessionExpired?.();
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
