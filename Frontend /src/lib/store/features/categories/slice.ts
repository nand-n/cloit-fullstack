import { Category, UpdateCategoryData } from '@/types/categories';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
    categories: Category[];
    parentCategories: Category[]; 
    loading: boolean;
    parentLoading: boolean; 
    error: string | null;
    parentError: string | null;
    addChildLoading: boolean; 
    addChildError: string | null;
    rootNodeId:string
    sucessfullyAdded:string;
    updateLoading: boolean; 
    updateError: string | null; 
    deleteLoading: boolean; 
    deleteError: string | null; 
}


const initialState: CategoriesState = {
    categories: [],
    parentCategories: [], 
    loading: false,
    parentLoading: false, 
    error: null,
    parentError: null, 
    addChildLoading: false,
    addChildError: null,
    rootNodeId:'',
    sucessfullyAdded:'',
    updateLoading: false,
    updateError: null, 
    deleteLoading: false, 
    deleteError: null, 
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategoriesStart(state, action: PayloadAction<string>) { 
            state.loading = true;
            state.error = null;
            state.rootNodeId= action.payload
        },
        fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
            state.loading = false;
        },
        fetchCategoriesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchParentsStart(state) {
            state.parentLoading = true;
            state.parentError = null;
        },
        fetchParentsSuccess(state, action: PayloadAction<Category[]>) {
            state.parentCategories = action.payload;
            state.parentLoading = false;
        },
        fetchParentsFailure(state, action: PayloadAction<string>) {
            state.parentLoading = false;
            state.parentError = action.payload;
        },
         addChildCategoryStart(state, _: PayloadAction<Category>) {
            state.addChildLoading = true;
            state.addChildError = null;
        },
        addChildCategorySuccess(state, action: PayloadAction<Category>) {
            state.addChildLoading = false;
           state.sucessfullyAdded = action.payload.id

        },
        addChildCategoryFailure(state, action: PayloadAction<string>) {
            state.addChildLoading = false;
            state.addChildError = action.payload;
           state.sucessfullyAdded = ''
        },
        updateCategoryStart(state, action:PayloadAction<UpdateCategoryData>) {
            state.updateLoading = true;
            state.updateError = null;
        },
        updateCategorySuccess(state, action: PayloadAction<Category>) {
            state.updateLoading = false;
            const { id, name, parentId, depth, children } = action.payload;
        
            const updateNodeInTree = (nodes: Category[]): Category[] => {
                return nodes.map((node) => {
                    if (node.id === id) {
                        return {
                            ...node,
                            name,
                            parentId,  
                            depth,
                            children: children || [],
                        };
                    }
                    if (node.children && node.children.length > 0) {
                        const updatedChildren = updateNodeInTree(node.children);
                        if (updatedChildren !== node.children) {
                            return { ...node, children: updatedChildren };
                        }
                    }
                    return node;  
                });
            };
        
            state.categories = updateNodeInTree(state.categories);
        },
        
       
        
        updateCategoryFailure(state, action: PayloadAction<string>) {
            state.updateLoading = false;
            state.updateError = action.payload;
        },

        deleteCategoryStart(state, _:PayloadAction<string>) {
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteCategorySuccess(state, action: PayloadAction<string>) {
            state.deleteLoading = false;
            const deletedCategoryId = action.payload;
        
            const removeNodeFromTree = (nodes: Category[]): Category[] => {
                return nodes
                    .filter((node) => node.id !== deletedCategoryId)
                    .map((node) => ({
                        ...node,
                        children: node.children ? removeNodeFromTree(node.children) : [],  
                    }));
            };
        
            state.categories = removeNodeFromTree(state.categories);
        },
        
        deleteCategoryFailure(state, action: PayloadAction<string>) {
            state.deleteLoading = false;
            state.deleteError = action.payload;
        },
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchParentsStart,  
    fetchParentsSuccess,
    fetchParentsFailure,
    addChildCategoryStart,
    addChildCategorySuccess,
    addChildCategoryFailure,
    updateCategoryStart, 
    updateCategorySuccess, 
    updateCategoryFailure, 
    deleteCategoryStart, 
    deleteCategorySuccess, 
    deleteCategoryFailure, 
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
