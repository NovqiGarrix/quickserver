import { Router } from 'express';

import validateCreateProject, { validateDeleteProject, validateUpdateBody } from '../../middleware/project/validateRequest';
import { createProject, getProject, getProjects, updateProject, deleteProject } from '../../controller/project.controller';

const router = Router();

router.get('/', getProjects);
router.get('/:projectId/one', getProject);

router.post('/', [validateCreateProject], createProject);
router.put('/:projectId/one', [validateUpdateBody], updateProject);

router.delete('/:projectId/one', [validateDeleteProject], deleteProject);

export default router