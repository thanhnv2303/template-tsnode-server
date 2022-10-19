import express from 'express';
import responseTime from 'response-time';
import { Config } from './config/getConfig';
import errorHandlerMiddleware from './server/errors/errorHandler';
import { responseTimeStat } from './server/middleware';
import { mongoConnect } from './server/models/database';
import router from './server/routes';
import { setHelmet, setLimitBody, setLimiter } from './server/services/limit';

// import { setupApp } from './services/setup';
import { initCors } from './server/services/setupCors';
import { setUpSwagger } from './server/services/setupSwagger';

const app = express();


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
    console.info(`Swagger run on http://${host}:${port}/swagger `);
    console.info(`Swagger file on http://${host}:${port}/swagger.json `);
  });
}

setupApp(app);

export default app;
