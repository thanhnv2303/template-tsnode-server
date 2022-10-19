import fs from 'fs';

import { DEFAULT_CONFIG } from '../defaultConfig';

function fileExist(path) {
  if (fs.existsSync(path)) {
    // File exists in path
  } else {
    const fileName = path.slice(path.lastIndexOf('/') + 1, path.length);
    throw `${fileName} is't exist in Root directory`;
  }
}

export function getNodeEnvironment() {
  const NODE_ENVIRONMENT = process.env.NODE_ENV || 'development';

  return NODE_ENVIRONMENT;
}

export function getConfig() {
  const nodeEnvironment = getNodeEnvironment();
  let _path;
  switch (nodeEnvironment) {
    case 'production': {
      console.log('In production mode');
      _path = '../../production.config.json';
      fileExist(`${__dirname}/${_path}`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const productionConfig = require('../../production.config.json');
      return productionConfig;
    }

    default: {
      console.log('In develop mode');
      _path = '../../develop.config.json';
      try {
        fileExist(`${__dirname}/${_path}`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const devConfig = require('../../develop.config.json');

        return devConfig;
      } catch (e) {
        console.log(e);
        console.log('Use develop.config.ts file config');
        return DEFAULT_CONFIG;
      }
    }
  }
}

export const Config = getConfig();
