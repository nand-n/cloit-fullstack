import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchCategoriesFailure,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchParentsStart,
    fetchParentsFailure,
    fetchParentsSuccess,
    addChildCategorySuccess,
    addChildCategoryFailure,
    addChildCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategorySuccess,
    deleteCategoryFailure,
    updateCategoryStart,
    deleteCategoryStart,

} from './slice';
import { addChildCategory, deleteCategory, getAllParrentCategories, getCategoryHierarchy, updateCategory } from './api'; 
import { PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/types/categories';
import { showToast } from '../toast/slice';
import { useAppDispatch } from '../../hook';

function* fetchCategoryHierarchySaga(action: PayloadAction<string>) {
    try {
        const response: Category[] = yield call(getCategoryHierarchy, action.payload);
        yield put(fetchCategoriesSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchCategoriesFailure(error.message));
        } else {
            yield put(fetchCategoriesFailure('Unknown error happened'));
        }
    }
}

function* fetchParentsCategory() {
    try {
        const response: Category[] = yield call(getAllParrentCategories);
        yield put(fetchParentsSuccess(response)); // Dispatch success action for parent categories
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchParentsFailure(error.message)); // Dispatch failure action with error message
        } else {
            yield put(fetchParentsFailure('Unknown error happened'));
        }
    }
}


function* addChildCategorySaga(action: PayloadAction<Category>) {
    try {
        const response:Category = yield call(addChildCategory, action.payload);
        yield put(addChildCategorySuccess(response));
      yield put(showToast({ message: 'Created Successfully!', type: 'success' }));

    } catch (error) {
        if (error instanceof Error) {
            yield put(addChildCategoryFailure(error.message));
        yield put(showToast({ message: 'Failed to Create!', type: 'error' }));

        } else {
            yield put(addChildCategoryFailure('Unknown error happened'));
        }
    }
}
function* updateCategorySaga(action: PayloadAction<{ id: string; updateData: { name?: string; parentId?: string } | Category }>) {
    try {
      const { id, updateData } = action.payload;
      const response: Category = yield call(updateCategory, id, updateData);
      yield put(updateCategorySuccess(response));
      yield put(showToast({ message: 'Update Success!', type: 'success' }));

    } catch (error) {
      if (error instanceof Error) {
        yield put(updateCategoryFailure(error.message)); 
      } else {
        yield put(updateCategoryFailure('Unknown error happened'));
        yield put(showToast({ message: 'Failed to Update!', type: 'error' }));

      }
    }
  }
  
  function* deleteCategorySaga(action: PayloadAction<string>) {
    try {
      const categoryId = action.payload;
      yield call(deleteCategory, categoryId);
      yield put(deleteCategorySuccess(categoryId));
      yield put(showToast({ message: 'Deleted Successfully!', type: 'success' }));

    } catch (error) {
      if (error instanceof Error) {
        yield put(deleteCategoryFailure(error.message)); 
      yield put(showToast({ message: 'Delete Error!', type: 'success' }));

      } else {
        yield put(deleteCategoryFailure('Unknown error happened'));
      }
    }
  }


export function* watchFetchCategoryHierarchy() {
    yield takeLatest(fetchCategoriesStart.type, fetchCategoryHierarchySaga);
}

export function* watchFetchParentsCategory() {
    yield takeLatest(fetchParentsStart.type, fetchParentsCategory);
}

export function* watchAddChildCategory() {
    yield takeLatest(addChildCategoryStart.type, addChildCategorySaga);
}

export function* watchUpdateCategory() {
    yield takeLatest(updateCategoryStart.type, updateCategorySaga);
  }
  
  export function* watchDeleteCategory() {
    yield takeLatest(deleteCategoryStart.type, deleteCategorySaga);
  }