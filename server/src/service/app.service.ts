import { FilterQuery } from "mongoose";
import AppModel, { App } from "../model/app.model";

async function getApps(projectId: string): Promise<App[] | undefined> {
    return AppModel.find({ projectId });
}

async function getApp(appId: string, projection?: Record<string, 0 | 1>): Promise<App | null>;
async function getApp(filter: FilterQuery<App>, projection?: Record<string, 0 | 1>): Promise<App | null>;

async function getApp(key: unknown, projection?: Record<string, 0 | 1>): Promise<App | null> {

    if(typeof key === 'object') {
        return AppModel.findOne((key as FilterQuery<App>), projection).lean();
    }

    return AppModel.findById(key as string, projection).lean();

}

async function createApp(data: Omit<App, '_id' | 'createdAt' | 'updatedAt'>): Promise<App> {
    
    const newApp = await AppModel.create(data);

    return {
        _id: newApp._id,
        userId: newApp.userId,
        projectId: newApp.projectId,
        name: newApp.name,
        type: newApp.type,
        createdAt: newApp.createdAt,
        updatedAt: newApp.updatedAt
    }
}

async function updateApp(data: Omit<App, 'name' | 'type' | 'createdAt' | 'updatedAt'>): Promise<App> {

    let app = await AppModel.findOneAndUpdate({ _id: data._id, projectId: data.projectId, userId: data.userId }, { ...data }) as App

    app = {
        _id: app._id,
        userId: app.userId,
        projectId: app.projectId,
        name: app.name,
        type: app.type,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt
    }

    return { ...app, ...data };

}

export type DeleteApp = { success: boolean, appId: string }
async function deleteApp(appId: string, projectId: string, userId: string): Promise<DeleteApp> {

    await AppModel.deleteOne({ _id: appId, projectId, userId });
    return { success: true, appId }

}

export default { getApps, getApp, createApp, updateApp, deleteApp }