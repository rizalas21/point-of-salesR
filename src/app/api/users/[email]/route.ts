import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = String(params.email);

  try {
    const data = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        userid: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log("error when get users by email => ", error);
  }
}