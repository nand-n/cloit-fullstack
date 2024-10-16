import { all } from "redux-saga/effects";
import {watchAddChildCategory, watchDeleteCategory, watchFetchCategoryHierarchy, watchFetchParentsCategory, watchUpdateCategory} from './features/categories/saga'
import { watchTreeActions } from "./features/treeSlice/saga";
import watchToastSaga from "./features/toast/saga";

export function* rootSaga(){
    yield all([
        watchFetchCategoryHierarchy(),
        watchFetchParentsCategory(),
        watchTreeActions(),
        watchAddChildCategory(),
        watchUpdateCategory(),
        watchDeleteCategory(),
        watchToastSaga()
    ])
}
