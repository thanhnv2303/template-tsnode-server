import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { Config } from '../../config/getConfig';

const limiter = rateLimit(Config.app.rateLimit);

// Apply the rate limiting middleware to all requests

export function setLimiter(app) {
  app.use(limiter);
}

export function setLimitBody(app) {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: false }));
}

export function setHelmet(app) {
  app.use(helmet());
}
