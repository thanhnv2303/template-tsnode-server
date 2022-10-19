import express from 'express';

const docFolder = __dirname + '/sample-docs/gen';

const router = express.Router();

router.use('/sample-docs', express.static(docFolder));

export default router;
