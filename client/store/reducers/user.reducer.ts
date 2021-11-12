import { AnyAction, Reducer } from 'redux';
import { REQUEST_USER, SET_ERROR_USER, SET_DATA_USER } from '../action.types';

type User = {
    _id: string;
    name: string;
    email: string;
    img: string;
    isGoogleAccount: boolean;
    apiKey: string
    createdAt: string;
    updatedAt: string;
}

export interface IUserReducer {

    isLoading: boolean;

    error: string | null;

    user: User | null
}

const initializeState: IUserReducer = {
    isLoading: false,
    error: null,
    user: null
}

const userReducer: Reducer = (state: IUserReducer = initializeState, action: AnyAction): IUserReducer => {

    switch (action.type) {
        case REQUEST_USER:
            return { ...state, isLoading: true }
    
        case SET_ERROR_USER:
            return { ...state, isLoading: false, error: action.payload }
    
        case SET_DATA_USER:
            return { ...state, isLoading: false, error: null, user: action.payload }
    
        default:
            return state
    }

}

export default userReducer