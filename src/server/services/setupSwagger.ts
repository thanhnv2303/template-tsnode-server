import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../swagger_output.json';

export function setUpSwagger(app) {
  const options = {
    explorer: true,
  };
  app.get('/swagger.json', (_req, res) => res.json(swaggerFile));
  app.use('/swagger', swaggerUi.serve, (...args) =>
    swaggerUi.setup(swaggerFile, options)(...args)
  );
}
