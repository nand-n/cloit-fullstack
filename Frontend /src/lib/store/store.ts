import { configureStore } from '@reduxjs/toolkit'
import createSagaMidleware from 'redux-saga'
import categoriesSlice from './features/categories/slice';
import treeSlice from './features/treeSlice/slice';
import toastSlice from './features/toast/slice';

import { rootSaga } from './rootSaga';

const sagaMidleware = createSagaMidleware()

export const makeStore = ()=>{
    const store =  configureStore({
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMidleware),
        reducer: {
            categories:categoriesSlice,
            tree: treeSlice,
            toast:toastSlice

        }
    });
    sagaMidleware.run(rootSaga)
    return store
}

export type AppStore = ReturnType<typeof makeStore>;
export  type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];