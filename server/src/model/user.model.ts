import mongoose from 'mongoose';

export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    img: string;
    isGoogleAccount: boolean;
    apiKey: string
    createdAt: string;
    updatedAt: string;
}

const schema = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },

    email: {
        required: true,
        unique: true,
        type: String
    },

    password: {
        type: String
    },

    img: {
        type: String,
        required: true
    },

    isGoogleAccount: {
        required: true,
        type: Boolean
    },

    apiKey: {
        type: String,
        required: true
    }

}, { timestamps: true });

const UserModel = mongoose.model<User>('User', schema);
export default UserModel

