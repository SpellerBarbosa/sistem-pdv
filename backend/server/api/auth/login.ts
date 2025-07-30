import { db } from "#imports";
import { Login } from "~/utils/interface/interfaces";
import { comparePassword } from "~/utils/common/bcrypt";

export default defineEventHandler(async (event) => {
  const { username, password } = (await readBody(event)) as Login;

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "usario ou senha está em branco.",
    });
  }

  try {
    const user = db
      .prepare(`SELECT username, password FROM users WHERE username = ? LIMIT 1`)
      .get(username) as Login;

    if (!user) {
      throw createError({
        statusCode: 400,
        message: "Usuario nao cadastrado",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw createError({
        statusCode: 400,
        message: "Senha inválida.",
      });
    }

    return { message: "Login bem sucedido." };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      message: "Servidor indisponivel, tente novamente mais tarde.",
    });
  }
});
