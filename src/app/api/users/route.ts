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
    const keyword = req.nextUrl.searchParams.get("keyword");
    const page = req.nextUrl.searchParams.get("page");
    const sort = req.nextUrl.searchParams.get("sort");
    const orderBy = req.nextUrl.searchParams.get("sortBy");

    const data = await prisma.users.findMany({
      where: {
        OR: [
          {
            email: { contains: keyword ?? "" },
          },
          {
            name: { contains: keyword ?? "" },
          },
        ],
      },
      orderBy: {},
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const authResponse = await AuthenticateToken(req);
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
