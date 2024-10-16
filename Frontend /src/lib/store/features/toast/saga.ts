
import { put } from 'redux-saga/effects';
import { hideToast, showToast } from './slice';

function* showToastSaga(action:any) {
      const { message, type } = action.payload;

  yield put(showToast({ message, type }));
  yield put(hideToast())
}

export default function* watchToastSaga() {
    yield put(showToastSaga);
  }