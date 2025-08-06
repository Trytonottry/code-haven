import crypto from 'crypto';

export const encrypt = (text, key = process.env.CRYPTO_KEY) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (encrypted, key = process.env.CRYPTO_KEY) => {
  const [ivHex, encryptedHex] = encrypted.split(':');
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const audit = (user, action, meta) => {
  console.log(`[AUDIT] ${new Date().toISOString()} user=${user} action=${action} meta=${JSON.stringify(meta)}`);
};