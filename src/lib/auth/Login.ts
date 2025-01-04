import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function Login(email: string, password: string) {
  if (!email || !password) {
    console.log("email or password is required");
    return null;
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const bcryptPass = bcrypt.compareSync(password, user?.password || "");

    if (user && bcryptPass) {
      const accessToken = jwt.sign(
        { email: user?.email, name: user?.name },
        process.env.ACCESS_TOKEN_SECRET ?? "",
        { expiresIn: "1h" }
      );
      return {
        id: user.userid.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        token: accessToken,
      };
    }
    console.log("email or password is wrong!");
    return null;
  } catch (err) {
    console.log("error when try to Login => ", err);
    return null;
  }
}
