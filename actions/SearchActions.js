/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    SEARCH_UNIT,
    SEARCH_UNIT_SUCCESS,
    SEARCH_UNIT_FAILURE,
    AVAILABLE_SEARCH_UNIT,
    AVAILABLE_SEARCH_UNIT_SUCCESS,
    AVAILABLE_SEARCH_UNIT_FAILURE
} from './types';

/**
 * Redux Action Get Search
 */
export const getSearch = (token,searchForm) => ({
    type: SEARCH_UNIT,
    payload: { searchForm: searchForm, token: token }
});

/**
 * Redux Action Get Todos Success
 */
export const getSearchSuccess = (response) => ({
    type: SEARCH_UNIT_SUCCESS,
    payload: response
});

/**
 * Redux Action Get Todos Failure
 */
export const getSearchFailure = (error) => ({
    type: SEARCH_UNIT_FAILURE,
    payload: error
});


/**
 * Redux Action Get Search
 */
export const getAvailableSearch = (token,searchForm) => ({
    type: AVAILABLE_SEARCH_UNIT,
    payload: { searchForm: searchForm, token: token }
});

/**
 * Redux Action Get Todos Success
 */
export const getAvailableSearchSuccess = (response) => ({
    type: AVAILABLE_SEARCH_UNIT_SUCCESS,
    payload: response
});

/**
 * Redux Action Get Todos Failure
 */
export const getAvailableSearchFailure = (error) => ({
    type: AVAILABLE_SEARCH_UNIT_FAILURE,
    payload: error
});



 


