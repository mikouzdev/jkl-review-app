import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let logoutCallback: (() => void) | null = null;

export function registerLogoutHandler(fn: () => void) {
  logoutCallback = fn;
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && logoutCallback) {
      logoutCallback();
    }
    return Promise.reject(err);
  }
);

export default api;
