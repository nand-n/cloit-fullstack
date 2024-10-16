// src/sagas/treeSaga.ts
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { 
  collapseAll,
   expandAll } from "./slice";

function* handleExpandAll(action: any) {
  try{
    yield put(expandAll(action.payload)); 

  }catch(error) {
    console.log(error, "error happened");
  }
}

function* handleCollapseAll() {
  yield put(collapseAll); 
}

export function* watchTreeActions() {
  yield put(handleExpandAll);
  yield put(handleCollapseAll);
}
