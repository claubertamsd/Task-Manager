import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

class SessionsController {
  async login(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "MEMBERS" }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword} = user

    return response.json({token, user: userWithoutPassword})


  }
}
export {SessionsController}