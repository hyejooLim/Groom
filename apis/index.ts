import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { developmentURL, productionURL } from "../constants/URL";

export const createApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${developmentURL}/api`
      : `${productionURL}/api`,
  withCredentials: true,
});

createApi.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

createApi.interceptors.response.use(
  (res: AxiosResponse) => {
    const response = res.data;
    return response;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

const clientApi = {
  get: <T>(url: string): Promise<T> => createApi.get(url),
  post: <T>(url: string, body: object): Promise<T> => createApi.post(url, body),
  put: <T>(url: string, body?: object): Promise<T> => createApi.put(url, body),
  delete: <T>(url: string): Promise<T> => createApi.delete(url),
};

export default clientApi;
