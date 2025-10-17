import { AxiosError } from "axios";
import { jwtDecode, type JwtPayload } from "jwt-decode";
export const setItem = (key: string, value: string) =>
  localStorage?.setItem(key, value);
export const getItem = (item: string) => localStorage?.getItem(item);
export const removeItem = (item: string) => localStorage?.removeItem(item);

export function getChartData(body: {
  data: Record<string, any>[];
  labelKey: string;
  dateKey: string;
}) {
  const { data, labelKey, dateKey } = body;

  return data.map((item) => ({
    x: item?.[dateKey],
    y: item?.[labelKey],
  }));
}

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token) as JwtPayload;
  const now = Date.now() / 1000;
  return now > (decodedToken?.exp || 0);
};

export const handleApiError = (error: any) => {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }

  return error;
};
