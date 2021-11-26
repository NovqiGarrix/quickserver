import { AnyAction, Reducer } from 'redux';
import { CREATE_NEW_APP, CREATING_NEW_APP, DELETE_APP, MOVE_NEW_APP, REQUEST_ACTION_APP, REQUEST_APP, SET_DATA_APP, SET_ERROR_APP, SET_ERROR_CREATING_NEW_APP, UPDATE_DATA_APP } from '../action.types';

import { CodeIcon, DeviceMobileIcon, DeviceTabletIcon } from '@heroicons/react/outline';

export type App = {
    _id: string;
    userId: string;
    projectId: string;
    name: string;
    type: 'web' | 'ios' | 'android';
    Icon: any;
    createdAt: string;
    updatedAt: string;
}

export interface IAppReducer {

    isLoading: boolean;
    creatingLoading: boolean;
    isActionLoading: {
        status: boolean;
        appId: string
    }

    error: string | null;
    createAppError: string | null;

    app: Array<App> | null;

    newApp: App | null;

}

const initializeState: IAppReducer = {
    isLoading: false,
    creatingLoading: false,
    isActionLoading: {
        status: false,
        appId: ""
    },
    error: null,
    createAppError: null,
    app: null,
    newApp: null
}

const appReducer: Reducer = (state: IAppReducer = initializeState, action: AnyAction): IAppReducer => {

    switch (action.type) {
        case REQUEST_APP:
            return { ...state, isLoading: true }

        case CREATING_NEW_APP:
            return { ...state, creatingLoading: true }

        case REQUEST_ACTION_APP:
            return { ...state, isActionLoading: { status: true, appId: action.payload } }

        case SET_ERROR_APP:
            return { ...state, isLoading: false, error: action.payload, creatingLoading: false, isActionLoading: { status: false, appId: '' } }

        case SET_ERROR_CREATING_NEW_APP:
            return { ...state, isLoading: false, createAppError: action.payload, creatingLoading: false, isActionLoading: { status: false, appId: '' } }

        case SET_DATA_APP:
            const data = action.payload as Array<App>

            return { ...state, isLoading: false, error: null, app: data.map((app) => ({ ...app, Icon: app.type === 'web' ? CodeIcon : app.type === 'ios' ? DeviceMobileIcon : DeviceTabletIcon })) }

        case CREATE_NEW_APP:
            const newApp = action.payload as App
            console.log(newApp);

            return { ...state, creatingLoading: false, createAppError: null, newApp: { ...newApp, Icon: newApp.type === 'web' ? CodeIcon : newApp.type === 'ios' ? DeviceMobileIcon : DeviceTabletIcon } }

        case MOVE_NEW_APP:
            state.app?.push(state.newApp!);

            return { ...state, newApp: null }

        case DELETE_APP:
            const appId = action.payload as string

            return { ...state, isActionLoading: { status: false, appId: "" }, error: null, app: state.app?.filter((app) => app._id !== appId)! }

        default:
            return state
    }

}

export default appReducer