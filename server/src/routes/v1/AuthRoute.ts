import { Router } from 'express';

import { getAuthURL, handleOAuthRedirect } from '../../controller/auth.controller';

const router = Router();

router.get('/', getAuthURL);
router.get('/oauth-redirect', handleOAuthRedirect);

export default router