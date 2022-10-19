import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    validate: /^0x[a-fA-F0-9]{40}$/,
  },
  publicKeyToEncrypt: {
    type: String,
    required: true,
    validate: /[a-fA-F0-9]{130}$/,
  },
  patientInfo: {
    type: Object,
  },
  encryptedKey: {
    type: String,
  },
  acceptMigrate: {
    type: Boolean,
  },
  lastFaucet: {
    type: Date,
    default: 0,
  },
  migrating: {
    type: Boolean,
    default: false,
  },
  migratingTimeout: {
    type: Number,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);
userSchema.index({ userId: 'hashed' });
userSchema.index({ address: 'hashed' });

export default User;
