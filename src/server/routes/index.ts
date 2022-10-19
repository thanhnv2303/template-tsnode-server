import express from 'express';

// develop router
import routerDev from './dev-routes/index';
import docs from './docs/index';

const router = express.Router();
router.use('/docs', docs);

// develop router
router.use('/dev', routerDev);

export default router;
