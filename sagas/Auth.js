/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { signin, getTokenForVerification } from './../api'
import {
    LOGIN_USER,
    LOGIN_FACEBOOK_USER,
    LOGIN_GOOGLE_USER,
    LOGIN_TWITTER_USER,
    LOGIN_GITHUB_USER,
    LOGOUT_USER,
    SIGNUP_USER,
    TOKEN_VERIFICATION,
    TOKEN_VERIFICATION_FAILURE,
    TOKEN_VERIFICATION_SUCCESS
} from '../actions/types';

import {
    signinUserSuccess,
    signinUserFailure,
    logoutUserFromFirebaseSuccess,
    logoutUserFromFirebaseFailure,
    checkTokenSucess,
    checkTokenFailure
} from '../actions';
import { NotificationManager } from 'react-notifications';
/**
 * Sigin User With Email and Password Request
 */
const signInUserWithEmailPasswordRequest = async (email, password) =>
    await signin(email, password)
        .then(authUser => authUser)
        .catch(error => error);



/**
* Sigin User With Email and Password Request
*/
const checkTokenWithToken = async (token) =>
    await getTokenForVerification(token)
        .then(authUser => authUser)
        .catch(error => error);



/**
 * Signin User With Email & Password
 */
function* signInUserWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    console.log("payload", payload)
    const { history } = payload;
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
        if (!signInUser.data.success) {
            let hassucceeded = signInUser.data.hassucceeded,
                message = signInUser.data.message
            yield put(signinUserFailure(message));
            // history.push('/signin', signInUser.data)
        }
        else {
            localStorage.setItem('token', JSON.stringify(signInUser.data.data.token));
            console.log("signInUser.data.data", signInUser.data.data)
            localStorage.setItem('tokenweb', signInUser.data.data.token);
            localStorage.setItem('userid', JSON.stringify("userid"));
            let getData = localStorage.getItem('tokenweb')
            let userType = signInUser.data.data.userType
            let hassucceeded = signInUser.data.hassucceeded
            yield put(signinUserSuccess("userid", getData, userType, hassucceeded));
            // history.push('/app/admin/developments');
            history.push('/home-v1');
            NotificationManager.success('User Logged In');
        }
    }
    catch (error) {
        yield put(signinUserFailure(error));
    }
}


/**
 * Signin User With Email & Password
 */
function* checkUserWithToken({ payload }) {
    console.log("payload", payload)
    const { token, history } = payload;
    
    if (!token) {
        console.log("Iam here")
        localStorage.removeItem('user_id');
        localStorage.removeItem('tokenweb');
        localStorage.removeItem('userid');
        history.push('/home-v1');
        yield put(logoutUserFromFirebaseSuccess())
    }
    else {
        try {
            const checkUser = yield call(checkTokenWithToken, token);
            if (!checkUser.data.success) {
                localStorage.removeItem('user_id');
                localStorage.removeItem('tokenweb');
                localStorage.removeItem('userid');
                yield put(logoutUserFromFirebaseSuccess())
                // history.push('/signin', signInUser.data)
            }
            else {
                yield put(checkTokenSucess("userid"));
            }
        }
        catch (error) {
            localStorage.removeItem('user_id');
            localStorage.removeItem('tokenweb');
            localStorage.removeItem('userid');
            yield put(logoutUserFromFirebaseSuccess())
        }
    }
}


/** 
 * Signout User
 */
function* signOut() {
    try {
        localStorage.removeItem('user_id');
        localStorage.removeItem('tokenweb');
        localStorage.removeItem('userid');
        yield put(logoutUserFromFirebaseSuccess())
    } catch (error) {
        yield put(logoutUserFromFirebaseFailure());
    }
}


/**
 * Signin User In Firebase
 */
export function* signinUserInFirebase() {
    console.log("Iam here")
    yield takeEvery(LOGIN_USER, signInUserWithEmailPassword);
}


/**
 * Signout User From Firebase
 */
export function* signOutUser() {
    yield takeEvery(LOGOUT_USER, signOut);
}


export function* checkToken() {
    yield takeEvery(TOKEN_VERIFICATION, checkUserWithToken)
}



/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(signinUserInFirebase),
        fork(signOutUser),
        fork(checkToken)
    ]);
}