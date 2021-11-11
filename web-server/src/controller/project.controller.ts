import { Request, Response } from 'express';

import sendHTTPError from '../util/sendError';
import projectService, { DeleteProject } from '../service/project.service';
import { Project } from '../model/project.model';
import { CreateProject, DeleteProjectParams, GetProjectParams, UpdateProjectParams } from '../middleware/project/validateRequest';


export const getProjects = async (req: Request, res: Response): Promise<Response> => {

    const { _id: userId, apiKey } = res.locals.user as { _id: string, apiKey: string }

    try {
        
        const projects = await projectService.getProjects(userId, apiKey);

        const response = {
            data: projects,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const getProject = async (req: Request<GetProjectParams>, res: Response): Promise<Response> => {

    const { _id: userId, apiKey } = res.locals.user as { _id: string, apiKey: string }
    const projectId = req.params.projectId

    try {
        
        const project = await projectService.getProject({ _id: projectId, userId, apiKey });

        const response = {
            data: project,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const createProject = async (req: Request<{}, {}, CreateProject>, res: Response): Promise<Response> => {

    const { _id: userId, apiKey, name: username } = res.locals.user

    try {
        
        const project = await projectService.createProject({ ...req.body, userId, apiKey }, username);

        const response = {
            data: project,
            error: null
        }

        return res.send(response).status(201);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const updateProject = async (req: Request<UpdateProjectParams>, res: Response): Promise<Response> => {

    const projectId = req.params.projectId

    try {

        
        const response: { data: Project | null, error: null | string } = {
            data: null,
            error: null
        }

        const updatedProject = await projectService.updateProject({ ...req.body, _id: projectId });

        response.error = `Failed to update project: ${projectId}`;
        if(!updatedProject) return res.status(500).send(response)

        response.data = updatedProject
        response.error = null
        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const deleteProject = async (req: Request<DeleteProjectParams>, res: Response): Promise<Response> => {

    const { projectId } = req.params

    try {
        
        const deleteStatus = await projectService.deleteProject(projectId);

        const response: { data: DeleteProject | null, error: null | string } = {
            data: deleteStatus,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}