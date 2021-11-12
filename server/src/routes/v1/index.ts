import { Router } from 'express';

import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import ProjectRoute from './ProjectRoute';
import AppRoute from './AppRoute';

import authMiddleware from '../../middleware/auth';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/user', authMiddleware, UserRoute);
router.use('/project', authMiddleware, ProjectRoute);
router.use('/app', authMiddleware, AppRoute);

export default router