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
    if (newAccessToken) localStorage.setItem('accessToken', newAccessToken);

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

export type CreateProjectType = Record<string, string> & { name: string }
export async function createProjectAPI(data: CreateProjectType) {
    const { data: result } = await API.post('/', data);
    return result
}

export async function deleteProjectAPI(projectId: string) {
    const { data } = await API.delete(`/${projectId}/one`);
    return data
}

export type UpdateProjectType = Record<string, string>
export async function updateProjectAPI(projectId: string, data: UpdateProjectType) {
    const { data: result } = await API.put(`/${projectId}/one`, data);
    return result
}