import responseTime from 'response-time';

import { Config } from '../../config/getConfig';
import errorHandlerMiddleware from '../errors/errorHandler';
import { responseTimeStat } from '../middleware';
import { mongoConnect } from '../models/database';
import router from '../routes';

import { setHelmet, setLimitBody, setLimiter } from './limit';
import { initCors } from './setupCors';
import { setUpSwagger } from './setupSwagger';

export function setupApp(app) {
  setLimiter(app);
  initCors(app);

  setLimitBody(app);
  setHelmet(app);

  mongoConnect();

  app.use(responseTime(responseTimeStat));

  setUpSwagger(app);

  // set route welcome
  app.get('/', (_req, res) => {
    res.status(200).send({ message: 'Welcome to the MEN-REST-API' });
  });

  app.use('/api', router);

  app.use(errorHandlerMiddleware);

  const port = Config.app.port || 8000;
  const host = Config.app.host || '0.0.0.0';

  app.listen(port, host, () => {
    console.info(`Server run on http://${host}:${port} `);
  });
}
