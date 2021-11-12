import { Router } from 'express';

import { getApps, getApp, createApp, updateApp, deleteApp } from '../../controller/app.controller';
import { validateCreateApp, validateDeleteApp, validateGetApps, validateUpdateApp } from '../../middleware/app/validateRequest';

const router = Router();

router.get('/:projectId', [validateGetApps], getApps);
router.get('/:projectId/:appId/one', [validateGetApps], getApp);

router.post('/:projectId', [validateCreateApp], createApp);
router.put('/:projectId/:appId/one', [validateUpdateApp], updateApp);

router.delete('/:projectId/:appId/one', [validateDeleteApp], deleteApp);

export default router