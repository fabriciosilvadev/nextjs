import { api } from "./apiService";

export const frontService = {
  async getAllBrands() {
    const request = await api.get(
      "/api/brand/list?page=1&orderBy=createdAt&order=asc&limit=2000"
    );
    return request;
  },
  async getAllCategories() {
    const request = await api.get(
      "/api/category/list?page=1&orderBy=createdAt&order=asc&limit=2000"
    );
    return request;
  },
};
