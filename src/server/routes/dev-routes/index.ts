import express from 'express';

const devRouter = express.Router();

devRouter.post('/login', login);
devRouter.get('/login', login);

function login(req, res, next) {
  res.json({
    message: 'success',
  });
}

export default devRouter;
