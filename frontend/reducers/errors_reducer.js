import { combineReducers } from 'redux';
import session from './session_errors_reducer';

export const errorsReducer = combineReducers({
  session,
});