/**
 * App Reducers
 */
import { combineReducers } from 'redux';


import authUserReducer from './AuthUserReducer';
import searchReducer from './SearchReducer';
import developmentReducer from './DevelopmentReducer'


const reducers = combineReducers({
  authUser: authUserReducer,
  search: searchReducer,
  development: developmentReducer
});

export default reducers;
