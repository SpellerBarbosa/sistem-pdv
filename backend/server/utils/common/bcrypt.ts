import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  if (!hash) {
    throw new Error("Erro ao hashear a senha");
  }
  return hash;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
