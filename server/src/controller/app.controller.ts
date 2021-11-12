import { Request, Response } from 'express';
import { CreateAppBody, CreateParams, DeleteParams, GetAppParams, GetAppsParams, UpdateParams } from '../middleware/app/validateRequest';
import { App } from '../model/app.model';

import appService, { DeleteApp } from '../service/app.service';
import sendHTTPError from '../util/sendError';

export const getApps = async (req: Request<GetAppsParams>, res: Response): Promise<Response> => {

    const { projectId } = req.params

    try {

        const apps = await appService.getApps(projectId);

        const response = {
            data: apps,
            error: null
        }

        return res.send(response);
        
    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const getApp = async (req: Request<GetAppParams>, res: Response): Promise<Response> => {

    const { appId } = req.params

    try {

        const app = await appService.getApp(appId);

        const response = {
            data: app,
            error: null
        }

        return res.send(response);
        
    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const createApp = async (req: Request<CreateParams, {}, CreateAppBody>, res: Response): Promise<Response> => {

    const { projectId } = req.params
    const { _id: userId } = res.locals.user

    try {
        
        const newApp = await appService.createApp({ ...req.body, userId, projectId });

        const response = {
            data: newApp,
            error: null
        }
        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const updateApp = async (req: Request<UpdateParams>, res: Response): Promise<Response> => {

    const { appId, projectId } = req.params
    const { _id: userId } = res.locals.user

    try {
        
        const response: { data: App | null, error: null | string } = {
            data: null,
            error: null
        }
        
        const updatedApp = await appService.updateApp({ ...req.body, _id: appId, projectId , userId});

        response.error = `Failed to update project: ${projectId}`;
        if(!updatedApp) return res.status(500).send(response)

        response.data = updatedApp
        response.error = null
        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const deleteApp = async (req: Request<DeleteParams>, res: Response): Promise<Response> => {

    const { projectId, appId } = req.params
    const { _id: userId } = res.locals.user

    try {
        
        const deletedApp = await appService.deleteApp(appId, projectId, userId);

        const response: { data: DeleteApp | null, error: null | string } = {
            data: deletedApp,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}