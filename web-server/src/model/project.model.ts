import mongoose from 'mongoose';

export interface Project {
    _id: string
    userId: string;
    apiKey: string;
    dbName: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const schema = new mongoose.Schema({

    userId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    apiKey: {
        type: String,
        required: true
    },

    name: {
        required: true,
        type: String
    },

    dbName: {
        required: true,
        type: String
    }

}, { timestamps: true });

const ProjectModel = mongoose.model<Project>('project', schema);
export default ProjectModel