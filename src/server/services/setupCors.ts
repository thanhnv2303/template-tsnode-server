import cors from 'cors';

import { Config } from '../../config/getConfig';

export function initCors(app) {
  const whiteListString = Config.app.cors.whiteListString;
  let corsOptions;
  if (!whiteListString) return;

  if (whiteListString === '*') {
    corsOptions = { origin: '*' };
  } else {
    const whitelist = whiteListString.split(',').map((item) => item.trim());
    corsOptions = {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
  }

  app.options('*', cors(corsOptions));
  app.use(cors());
}
