import mongoose from 'mongoose';

export interface App {
    _id: string;
    userId: string;
    projectId: string;
    name: string;
    type: 'web' | 'ios' | 'android';
    createdAt: string;
    updatedAt: string;
}

const schema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    name: {
        required: true,
        type: String
    },

    type: {
        type: String,
        required: true
    }

}, { timestamps: true });

const AppModel = mongoose.model<App>('app', schema);
export default AppModel