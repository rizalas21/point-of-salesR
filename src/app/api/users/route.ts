import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import AuthenticateToken from "@/lib/middleware/AuthenticateToken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRound = 10;

export async function GET(req: NextRequest) {
  const authResponse = await AuthenticateToken(req);
  if (!authResponse || authResponse.status === 403) return authResponse;

  try {
    const email = req.nextUrl.searchParams.get("email");
    const name = req.nextUrl.searchParams.get("name");
    const data = await prisma.users.findMany({
      where: {
        OR: [
          {
            email: { contains: email ?? "" },
          },
          {
            name: { contains: name ?? "" },
          },
        ],
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error when get users => ", error);
  }
}

export async function POST(req: NextRequest) {
  const authResponse = await AuthenticateToken(req);
  console.log("res api post: ", authResponse);
  if (!authResponse || authResponse.status === 403) return authResponse;

  try {
    const input = await req.json();
    const data = {
      ...input,
      password: bcrypt.hashSync(input.password, saltRound),
      name: input?.name,
      role: input?.role || "",
    };

    const checkEmail = await prisma.users.findUnique({
      where: { email: input.email },
    });

    if (!checkEmail || checkEmail === null) {
      const post = await prisma.users.create({ data });
      return NextResponse.json(post, { status: 201 });
    }
    return NextResponse.json(
      { message: "email already exist" },
      { status: 400 }
    );
  } catch (error) {
    console.log("error when post users => ", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
