import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jwtToken } from '../config/jwt.key';

dotenv.config();

const JWT_PRIVATE = jwtToken.privateKey
const JWT_PUBLIC = jwtToken.publicKey

interface JwtReturn {
    valid: boolean;
    data: any;
    expired?: string
}

const decodeToken = (token: string): JwtReturn => {

    try {
        const decoded = jwt.decode(token);

        return {
            valid: true,
            data: decoded,
        }
    } catch (error: any) {
        return {
            valid: true,
            data: null,
            expired: error.message === 'jwt expired' ? 'Token expired' : ''
        }
    }

}

const signToken = (data: Object, options?: jwt.SignOptions): string => {
    return jwt.sign(data, JWT_PRIVATE, { ...(options && options), algorithm: 'RS256' });
}

const verifyToken = (token: string): JwtReturn => {
    try {

        const verifiedToken = jwt.verify(token, JWT_PUBLIC);

        return {
            valid: true,
            data: verifiedToken,
        }

    } catch (error: any) {
        return {
            valid: false,
            data: null,
            expired: error.message === 'jwt expired' ? 'Token expired' : ''
        }
    }
}

export default { decodeToken, signToken, verifyToken }