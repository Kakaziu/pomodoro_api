import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export default function loginRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization) return res.status(401).json({ body: "Acess denied" });

  try {
    const { id, email } = jwt.verify(
      authorization,
      process.env.SECRET ?? ""
    ) as JwtPayload;

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
}
