require('dotenv').config();

// 기본 디폴트 설정을 위한 코드?
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if(value == null){
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required('DB_HOST'),
  },
  host: {
    port: parseInt(required('PORT', 3000)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT,ROUNDS', 12)),
  },
  jwt: {
    access_secret: required('JWT_ACCESS_SECRET'),
    refresh_secret: required('JWT_REFRESH_SECRET'),
    access_expiresInSec: required('JWT_ACCESS_EXPIRES'),
    refresh_expiresInSec: required('JWT_REFRESH_EXPIRES'),
  },
}