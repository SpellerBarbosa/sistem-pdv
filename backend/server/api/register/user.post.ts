import { db } from "#imports";
import { User } from "~/utils/interface/interfaces";
import { hashPassword } from "~/utils/common/bcrypt";

export default defineEventHandler(async (event) => {
  const { name, username, password, role } = (await readBody(event)) as User;

  if (!name || !username || !password || !role) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos.",
    });
  }

  try {
    const result = db
      .prepare(`SELECT username FROM  users WHERE username = ? LIMIT 1`)
      .get(username);

    if (result) {
      throw createError({
        statusCode: 400,
        message: "Usuário já cadastrado",
      });
    }

    const hasPassword = await hashPassword(password);

    const insertResult = db
      .prepare(
        `
        INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)
        `
      )
      .run(name, username, hasPassword, role);

    return { message: "Usuario cadastrado com sucesso." };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      message: "Servidor indisponivel tente novamente mais tarde.",
    });
  }
});
