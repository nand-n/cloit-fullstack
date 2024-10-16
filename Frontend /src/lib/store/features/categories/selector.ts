import { RootState } from "../../store";

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoryLoading = (state: RootState) => state.categories.loading;
export const selectCategoryError = (state: RootState) => state.categories.error;