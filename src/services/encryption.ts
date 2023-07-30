const bcrypt = require('bcrypt');
const saltRounds = 10;

export const encrypt = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const verify = async (hashed: string, password: string) => {
  return await bcrypt.compare(password, hashed);
};
