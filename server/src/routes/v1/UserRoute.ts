import { Router } from 'express';

import { getCurrentUser } from '../../controller/user.controller';

const router = Router();

router.get('/', getCurrentUser);


export default router