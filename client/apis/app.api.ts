import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.SERVER_URL}/api/v1/app` });

API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')!;
    const refreshToken = localStorage.getItem('refreshToken')!;

    config.headers = {
        'x-access-token': accessToken,
        'x-refresh-token': refreshToken
    }

    return config
}, (error) => {
    console.warn(error.message);
    return Promise.reject(error);
})

API.interceptors.response.use((result) => {

    const { data: { newAccessToken } } = result
    if (newAccessToken) localStorage.setItem('accessToken', newAccessToken);

    return result
}, (onRejected) => Promise.reject(onRejected));

export async function getAppsAPI(projectId: string) {
    const { data } = await API.get(`/${projectId}`)
    return data
}

export async function getAppAPI(projectId: string, appId: string) {
    const { data } = await API.get(`/${projectId}/${appId}/one`);
    return data
}

export async function deleteAppAPI(projectId: string, appId: string) {
    const { data } = await API.delete(`/${projectId}/${appId}/one`);
    return data
}

export type CreateAppType = Record<string, string> & { name: string, type: string; }
export async function createAppAPI(projectId: string, data: CreateAppType) {
    const { data: result } = await API.post(`/${projectId}`, data);
    return result
}