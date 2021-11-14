import { Request, Response, NextFunction } from 'express';
import { z, string } from 'zod';

import projectService from '../../service/project.service';
import sendHTTPError from '../../util/sendError';
import { zodError } from '../../util/zodError';

// TODO: Implement ZOD


export type GetProjectParams = { projectId: string }

const requestBody = z.object({
    name: string({ required_error: 'Please provide the project name!' })
});
export type CreateProject = z.infer<typeof requestBody>
const validateCreateProject = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validate = requestBody.safeParse(req.body)

    if (!validate.success) {
        const error = zodError(validate.error.issues);
        return sendHTTPError(res, error, 406);
    }

    return next();

}

export type UpdateProjectParams = { projectId: string }
export const validateUpdateBody = async (req: Request<UpdateProjectParams>, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const { projectId } = req.params
        const { _id: userId, apiKey } = res.locals.user

        const isEmptyBody = Object.keys(req.body).length < 1

        if (isEmptyBody) return sendHTTPError(res, 'Please provide at least one field to update!', 406);

        const existProject = await projectService.getProject({ _id: projectId, userId, apiKey }, { name: 1 })
        if (!existProject) return sendHTTPError(res, 'Invalid request!', 406)

        return next();
    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export type DeleteProjectParams = { projectId: string }
export const validateDeleteProject = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { projectId } = req.params;
    const { _id: userId, apiKey } = res.locals.user

    try {

        const project = await projectService.getProject({ _id: projectId, userId, apiKey }, { name: 1 });
        if (!project) return sendHTTPError(res, 'Invalid request!', 406);

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export default validateCreateProject