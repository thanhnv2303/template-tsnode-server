import mongoose from 'mongoose';

import { Config } from '../../config/getConfig';

export function mongoConnect() {
  mongoose.connect(Config.app.database.mongourl, () =>
    console.log('DB Connected')
  );
}
