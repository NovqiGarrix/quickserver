import { FilterQuery } from 'mongoose';
import ProjectModel, { Project } from "../model/project.model";

async function getProjects(userId: string, apiKey: string): Promise<Project[] | undefined> {
    return ProjectModel.find({ userId, apiKey });
}


async function getProject(projectId: string, userId: string, apiKey: string, projection?: Record<string, 0 | 1>): Promise<Project | null>;
async function getProject(filter: FilterQuery<Project>, projection?: Record<string, 0 | 1>, userId?: string, apiKey?: string): Promise<Project | null>;
async function getProject(key: unknown, ...args: any): Promise<Project | null> {
    if (typeof key === 'object') {
        return ProjectModel.findOne({ ...(key as FilterQuery<Project>) }, args?.projection);
    }

    const { userId, apiKey } = args
    return ProjectModel.findOne({ _id: key as string, userId, apiKey }, args?.projection);
}

async function createProject(data: Omit<Project, '_id' | 'createdAt' | 'updatedAt' | 'dbName'>, username: string): Promise<Project> {

    const splittedName = username.split(' ');
    const dbName = `${splittedName.length > 1 ? `${splittedName[0]}-${data.name.replaceAll(' ', '-')}-${splittedName[1]}` : `${splittedName[0]}-${data.name.replaceAll(' ', '-')}`}`

    const newProject = await ProjectModel.create({ name: data.name, dbName, userId: data.userId, apiKey: data.apiKey });

    return {
        _id: newProject._id,
        userId: newProject.userId,
        apiKey: newProject.apiKey,
        dbName: newProject.dbName,
        name: newProject.name,
        createdAt: newProject.createdAt,
        updatedAt: newProject.updatedAt
    }

}


// Validate:: -> projectId, userId, apiKey
async function updateProject(data: Omit<Project, 'createdAt' | 'updatedAt' | 'dbName' | 'userId' | 'apiKey'>): Promise<Project | null> {

    let project = await ProjectModel.findOneAndUpdate({ _id: data._id }, { ...data }).lean() as Project;

    project = {
        _id: project._id,
        userId: project.userId,
        apiKey: project.apiKey,
        dbName: project.dbName,
        name: project.name,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    }

    return { ...project, ...data };

}

export type DeleteProject = { success: boolean, projectId: string }
async function deleteProject(projectId: string): Promise<DeleteProject> {

    await ProjectModel.deleteOne({ _id: projectId });
    return { success: true, projectId }

}

export default { getProjects, getProject, createProject, updateProject, deleteProject }