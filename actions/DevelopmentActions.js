/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    GET_DEVELOPMENT,
    GET_DEVELOPMENT_SUCCESS,
    GET_DEVELOPMENT_FAILURE,
    GET_ALL_DEVELOPMENT,
    GET_ALL_DEVELOPMENT_SUCCESS,
    GET_ALL_DEVELOPMENT_FAILURE,
    SELECT_DEVELOPMENT_OPTION,
    GET_DEVELOPMENT_UNIT,
    GET_DEVELOPMENT_UNIT_SUCCESS,
    GET_DEVELOPMENT_UNIT_FAILURE,
    SET_STATUS,
    SET_STATUS_SUCCESS,
    SET_STATUS_FAILURE
} from './types';

/**
 * Redux Action Get Search
 */
export const getDevelopment = (token, developmentid, redirectUrl, history) => ({
    type: GET_DEVELOPMENT,
    payload: { developmentid: developmentid, token: token, redirectUrl: redirectUrl, history: history }
});

/**
 * Redux Action Get Todos Success
 */
export const getDevelopmentSuccess = (response) => ({
    type: GET_DEVELOPMENT_SUCCESS,
    payload: response
});

/** 
 * Redux Action Get Todos Failure
 */
export const getDevlopmentFailure = (error) => ({
    type: GET_DEVELOPMENT_FAILURE,
    payload: error
});

/**
 * Redux Action Get Search
 */
export const getAllDevelopment = (token) => ({
    type: GET_ALL_DEVELOPMENT,
    payload: { token: token }
});

/**
 * Redux Action Get Todos Success
 */
export const getAllDevelopmentSuccess = (response) => ({
    type: GET_ALL_DEVELOPMENT_SUCCESS,
    payload: response
});

/**
 * Redux Action Get Todos Failure
 */
export const getAllDevlopmentFailure = (error) => ({
    type: GET_ALL_DEVELOPMENT_FAILURE,
    payload: error
});


export const selecteOption = (parent, child) => ({
    type: SELECT_DEVELOPMENT_OPTION,
    payload: { parentSelect: parent, childSelect: child }
});


export const getDevelopmentUnit = (token, developmentid, unitid, redirectUrl, history) => ({
    type: GET_DEVELOPMENT_UNIT,
    payload: { id: developmentid, unitid: unitid, token: token, redirectUrl: redirectUrl, history: history }
});



export const getDevelopmentUnitSuccess = (response, development) => ({
    type: GET_DEVELOPMENT_UNIT_SUCCESS,
    payload: { unitResult: response, development: development }
});

export const getDevelopmentUnitFailure = () => ({
    type: GET_DEVELOPMENT_UNIT_FAILURE,
});


export const setHoldStatus = (token, id, unitid, status) => ({
    type: SET_STATUS,
    payload: { token: token, developmentid: id, unitid: unitid, status: status }
})

export const setHoldStatusSuccess = () => ({
    type: SET_STATUS_SUCCESS,

})

export const setHoldStatusFailure = (err) => ({
    type: SET_STATUS_FAILURE
})






