import { Router } from 'express';

import { getUserCache } from '../../middleware/cache/user';
import { getCurrentUser } from '../../controller/user.controller';

const router = Router();

router.get('/', [getUserCache], getCurrentUser);


export default router