import { combineReducers } from 'redux';
import projectReducer from './project.reducer';

import userReducer from './user.reducer';

export default combineReducers({
    user: userReducer,
    project: projectReducer
})