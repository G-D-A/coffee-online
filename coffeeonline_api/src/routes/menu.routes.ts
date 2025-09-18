import { Router } from 'express';
import { container } from 'tsyringe';
import { MenuController } from '../controllers/menu.controller';
import { authMiddleware, isAdmin } from '../middleware/auth.middleware';

const router = Router();
const controller = container.resolve(MenuController);

router.get('/', controller.list);
router.get('/:id', controller.details);
router.post('/', authMiddleware, isAdmin, controller.create);
router.post('/:id', authMiddleware, isAdmin, controller.update);
router.delete('/:id', authMiddleware, isAdmin, controller.delete);

export default router;
