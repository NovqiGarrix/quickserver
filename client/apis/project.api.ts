import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.SERVER_URL}/api/v1/project` });

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
    if(newAccessToken) localStorage.setItem('accessToken', newAccessToken);

    return result
}, (onRejected) => Promise.reject(onRejected));

export async function getProjectsAPI() {
    const { data } = await API.get('/')
    return data
}

export async function getProjectAPI(projectId: string) {
    const { data } = await API.get(`/${projectId}/one`);
    return data
}