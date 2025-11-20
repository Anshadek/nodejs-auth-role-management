import express from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin', 'manager'), getUsers);

export default router;
