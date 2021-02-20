/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './Auth';
import searchSagas from './Search';
import developmentSagas from './Development';

export default function* rootSaga(getState) {
    console.log('getState', getState)
    yield all([
        authSagas(),
        searchSagas(),
        developmentSagas()
    ]);
}