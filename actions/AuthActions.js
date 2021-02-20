/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    USER_TYPE_SUCCESS,
    TOKEN_VERIFICATION,
    TOKEN_VERIFICATION_SUCCESS,
    TOKEN_VERIFICATION_FAILURE
} from './types';

/**
 * Redux Action To Sigin User With Firebase
 */
export const signinUserInFirebase = (user, history) => ({
    type: LOGIN_USER,
    payload: { user, history }
});

/**
 * Redux Action Signin User Success
 */
export const signinUserSuccess = (user, token = null, userType, hassucceeded) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { user: user, token: token, userType: userType, hassucceeded: hassucceeded }
});


/**
 * Redux Action for GET USER TYPE 
 */
export const userTypeSuccess = (user, userType) => ({
    type: USER_TYPE_SUCCESS,
    payload: { user: user, userType: userType }
});


/**
 * Redux Action Signin User Failure
 */
export const signinUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error
})

/**
 * Redux Action Signout User Success
 */
export const logoutUserFromFirebaseSuccess = () => ({
    type: LOGOUT_USER_SUCCESS
});

/**
 * Redux Action Signout User Failure
 */
export const logoutUserFromFirebaseFailure = () => ({
    type: LOGOUT_USER_FAILURE
});


export const checkToken = (token,history) =>({
    type: TOKEN_VERIFICATION,
    payload: { token,history }
})

export const checkTokenSucess = () =>({
    type: TOKEN_VERIFICATION_SUCCESS,
})

export const checkTokenFailure = () =>({
    type: TOKEN_VERIFICATION_FAILURE,
})

 


