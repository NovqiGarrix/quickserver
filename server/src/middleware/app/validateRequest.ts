import { Request, Response, NextFunction } from 'express';
import { z, string } from 'zod';
import appService from '../../service/app.service';

import projectService from '../../service/project.service';

import sendHTTPError from '../../util/sendError';
import { zodError } from '../../util/zodError';

// TODO: Implement ZOD

export type GetAppsParams = { projectId: string }
export type GetAppParams = { appId: string }
export const validateGetApps = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { projectId } = req.params
    const { _id: userId, apiKey } = res.locals.user

    try {

        const project = await projectService.getProject({ _id: projectId, userId, apiKey }, { name: 1 });
        if (!project) return sendHTTPError(res, 'Invalid request!', 406);

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

const createAppRequestBody = z.object({
    name: string({ required_error: 'Please provide a name for your app!' }),
    type: z.enum(['web', 'ios', 'android'])
})

export type CreateAppBody = z.infer<typeof createAppRequestBody>
export type CreateParams = { projectId: string }
export const validateCreateApp = async (req: Request<CreateParams, {}, CreateAppBody>, res: Response, next: NextFunction): Promise<Response | void> => {

    const { _id: userId } = res.locals.user;
    const projectId = req.params.projectId

    try {

        const validate = createAppRequestBody.safeParse(req.body);
        if (!validate.success) {
            const error = zodError(validate.error.issues);
            return sendHTTPError(res, error, 406);
        }

        const { name, type } = req.body
        const existApp = await appService.getApp({ name, type, userId, projectId }, { name: 1 });
        if (existApp) return sendHTTPError(res, 'This app already registered on this project!', 406);

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export type UpdateParams = { projectId: string; appId: string; }
export const validateUpdateApp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { projectId, appId } = req.params
    const { _id: userId } = res.locals.user

    try {

        const isEmptyBody = Object.keys(req.body).length < 1
        if (isEmptyBody) return sendHTTPError(res, 'Please provide at least one field to update!', 406);

        const invalidAppType = !(req.body?.type === 'web' || req.body?.type === 'ios' || req.body?.type === 'android')
        if (invalidAppType) return sendHTTPError(res, 'Type field should be `web` or `ios` or `android`!', 406);

        const existApp = await appService.getApp({ _id: appId, userId, projectId }, { name: 1 });
        if (!existApp) return sendHTTPError(res, 'App not found!', 406);

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export type DeleteParams = { projectId: string, appId: string }
export const validateDeleteApp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { projectId, appId } = req.params
    const { _id: userId } = res.locals.user

    try {

        const app = await appService.getApp({ projectId, _id: appId, userId }, { name: 1 });
        if (!app) return sendHTTPError(res, 'App not found!', 406);

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}