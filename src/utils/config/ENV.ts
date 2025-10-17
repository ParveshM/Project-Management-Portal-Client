const { VITE_BASE_URL } = import.meta.env;

export const ENV = {
  BASE_URL: VITE_BASE_URL as string,
};
