import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  async get(endpoint: string) {
    const request = await api.get(endpoint);
    return request;
  },
  async post(endpoint: string, params: unknown) {
    const request = await api.post(endpoint, params);
    return request;
  },
  async put(endpoint: string, params: unknown) {
    const request = await api.put(endpoint, params);
    return request;
  },
  async delete(endpoint: string) {
    const request = await api.delete(endpoint);
    return request;
  },
};
