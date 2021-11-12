import { combineReducers } from 'redux';

import appReducer from './app.reducer';
import projectReducer from './project.reducer';
import userReducer from './user.reducer';

export default combineReducers({
    user: userReducer,
    project: projectReducer,
    app: appReducer
})