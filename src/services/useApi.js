import api from "@/config/axios";

// Categories
export const getCategories = async () => (await api.get("/category")).data;
export const getCategoryById = async (id) => (await api.get(`/category/${id}`)).data;
export const createCategory = async (data) => (await api.post("/category", data)).data;
export const updateCategory = async (id, data) => (await api.patch(`/category/${id}`, data)).data;
export const deleteCategory = async (id) => (await api.delete(`/category/${id}`)).data;

// Products
export const getProducts = async () => (await api.get("/product")).data;
export const getProductById = async (id) => (await api.get(`/product/${id}`)).data;
export const createProduct = async (data) => (await api.post("/product", data)).data;
export const updateProduct = async (id, data) => (await api.patch(`/product/${id}`, data)).data;
export const deleteProduct = async (id) => (await api.delete(`/product/${id}`)).data;
