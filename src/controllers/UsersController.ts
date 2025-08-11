import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);
    const userWithSameEmail = await prisma.users.findFirst({where: {email}});

    if (userWithSameEmail) {
      throw new AppError("User with same email already exist");
    }

    const hashedPassword = await hash(password, 8);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }

  async findAll(request: Request, response: Response) {
    
    const findAllUsers = await prisma.users.findMany();
    const userWithoutPassword = findAllUsers.map(
      ({ password, ...rest }) => rest
    );

    return response.json(userWithoutPassword);
  }

  async updatePermission (request: Request, response: Response){
    const bodySchema = z.object({
      role: z.enum(["ADMIN", "MEMBER"])
    })

    const paramsSchema = z.object({
      id: z.string().transform((id) => parseInt(id, 10))
    })

    const {role} = bodySchema.parse(request.body)
    const {id} = paramsSchema.parse(request.params)

    
    await prisma.users.update({
      data:{
        role
      },
      where:{
        id
      }
    })

    return response.status(200).json({message: "Atualizado a ROLE"})

  }
}

export { UsersController };
