// import { Category } from "@/types/categories";
// import { BASE_URL } from "@/utils/constants";
// import axios from "axios";


// export const createRootCategory = async (name: string): Promise<any> => {
//     const response = await axios.post(`${BASE_URL}/categories/create-root`, { name });
//     return response.data;
//   };
  
//   export const createCategoryWithChildren = async (categoryData: { name: string, children?: string[] }): Promise<any> => {
//     const response = await axios.post(`${BASE_URL}/categories/create-root-with-ancestors`, categoryData);
//     return response.data;
//   };
  
//     export const updateCategory = async (id: string, updateData: { name?: string; parentId?: string }): Promise<any> => {
//     const response = await axios.put(`${BASE_URL}/categories/update/${id}`, updateData);
//     return response.data;
//   };
  
//   export const addChildCategory = async (data:Category): Promise<any> => {
//     const response = await axios.post(`${BASE_URL}/categories/${data.parentId}/add-child`, data);
//     return response.data;
//   };
  
//     export const getAllCategories = async (): Promise<any> => {
//     const response = await axios.get(`${BASE_URL}/categories`);
//     return response.data;
//   };

//   export const getAllParrentCategories = async (): Promise<any> => {
//     const response = await axios.get(`${BASE_URL}/categories/root-nodes`);
//     return response.data;
//   };
  
//     export const getCategoryHierarchy = async (categoryId: string): Promise<any> => {
//     const response = await axios.get(`${BASE_URL}/categories/${categoryId}/hierarchy`);
//     return response.data;
//   };
  
//     export const deleteCategory = async (categoryId: string): Promise<any> => {
//     const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
//     return response.data;
//   };

import axios from 'axios';
import { Category } from "@/types/categories";

const NEXT_API_BASE_URL = '/api/categories';

/**
 * Create a root category.
 * @param {string} name - The name of the category.
 * @returns {Promise<any>} - The response data.
 */
export const createRootCategory = async (name: string): Promise<any> => {
    const response = await axios.post(`${NEXT_API_BASE_URL}/create-root`, { name });
    return response.data;
};

/**
 * Create a category with optional children categories.
 * @param {Object} categoryData - The category data.
 * @param {string} categoryData.name - The name of the category.
 * @param {string[]} [categoryData.children] - The optional child categories.
 * @returns {Promise<any>} - The response data.
 */
export const createCategoryWithChildren = async (categoryData: { name: string, children?: string[] }): Promise<any> => {
    const response = await axios.post(`${NEXT_API_BASE_URL}/create-root-with-ancestors`, categoryData);
    return response.data;
};

/**
 * Update an existing category by ID.
 * @param {string} id - The category ID.
 * @param {Object} updateData - The update data.
 * @param {string} [updateData.name] - The new name of the category.
 * @param {string} [updateData.parentId] - The new parent category ID.
 * @returns {Promise<any>} - The response data.
 */
export const updateCategory = async (id: string, updateData: { name?: string; parentId?: string }| Category): Promise<any> => {
    const response = await axios.put(`${NEXT_API_BASE_URL}/update/${id}`, updateData);
    return response.data;
};

/**
 * Add a child category to a parent category.
 * @param {Category} data - The child category data.
 * @returns {Promise<any>} - The response data.
 */
export const addChildCategory = async (data: Category): Promise<any> => {
    const response = await axios.post(`${NEXT_API_BASE_URL}/add-child`, data);
    return response.data;
};

/**
 * Fetch all categories.
 * @returns {Promise<any>} - The response data.
 */
export const getAllCategories = async (): Promise<any> => {
    const response = await axios.get(`${NEXT_API_BASE_URL}/all`);
    return response.data;
};

/**
 * Fetch all parent categories (root nodes).
 * @returns {Promise<any>} - The response data.
 */
export const getAllParrentCategories = async (): Promise<any> => {
    const response = await axios.get(`${NEXT_API_BASE_URL}/root-nodes`);
    return response.data;
};

/**
 * Fetch the hierarchy of a category by its ID.
 * @param {string} categoryId - The category ID.
 * @returns {Promise<any>} - The response data.
 */
export const getCategoryHierarchy = async (categoryId: string): Promise<any> => {
    const response = await axios.get(`${NEXT_API_BASE_URL}/hierarchy/${categoryId}`);
    return response.data;
};

/**
 * Delete a category by its ID.
 * @param {string} categoryId - The category ID.
 * @returns {Promise<any>} - The response data.
 */
export const deleteCategory = async (categoryId: string): Promise<any> => {
    const response = await axios.delete(`${NEXT_API_BASE_URL}/delete/${categoryId}`);
    return response.data;
};
