import { scrypt, randomBytes } from "crypto";

const PasswordUtil = {
  hash: async (password: string): Promise<string> => {
    const salt = randomBytes(8).toString("hex");
    const hash = await makeHash(password, salt);
    return `${hash}.${salt}`;
  },
  compair: async (password: string, hashedPassword: string) => {
    const [hash, salt] = hashedPassword.split(".");
    if (hash === (await makeHash(password, salt))) return true;
    else return false;
  },
};

const makeHash = async (str: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    scrypt(str, salt, 64, (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex"));
    });
  });
};

export default PasswordUtil;
