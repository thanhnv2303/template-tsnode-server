import path from 'path';

import swaggerAutogen from 'swagger-autogen';

import { Config } from './config/getConfig';

const PORT = Config.app.port || 8000;
const HOST = Config.app.host || '0.0.0.0';
const BASE_URL = Config.app.baseUrl || `${HOST}:${PORT}`;
const SCHEMES = Config.app.schemas || `http,https`;
const schemes = SCHEMES.split(',').map(function(item) {
  return item.trim();
});
const doc = {
  info: {
    version: '1.0.0',
    title: 'Integration server API',
    description:
      'Documentation automatically generated by the <b>swagger-autogen</b> module.'
  },
  host: BASE_URL,
  basePath: '/',
  schemes: schemes,
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'token to login to the server'
    }
  },
  security: [{ apiKeyAuth: [] }]
};

const outputFile = path.join(__dirname, './swagger_output.json');
console.log(outputFile);
const endpointsFiles = [
  './index.ts'
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
