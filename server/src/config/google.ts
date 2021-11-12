import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const REDIRECT_URI = `${process.env.BASE_API_URL}/auth/oauth-redirect`

export class Google {

    private static oAuthClient: OAuth2Client

    getClient(): OAuth2Client {
        console.log('OaAuthClient');
        if(!Google.oAuthClient) return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

        console.log('OaAuthClient already');
        return Google.oAuthClient
    }

}