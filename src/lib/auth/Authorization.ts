import jwt from 'jsonwebtoken'
import { NextApiRequest } from "next";

export default async function authenticateToken({
  req,
  res,
}: {
  req: NextApiRequest;
  res: any;
}) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(403);
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECURITY ?? "");
    return { user: decode };
  } catch (error) {
    console.log("error nihh => ", error);
  }
}