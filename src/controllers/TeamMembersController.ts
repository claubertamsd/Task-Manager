import { Response, Request } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class TeamMembersController {
  async addMembers(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.number(),
      teamId: z.number(),
    });


    const { userId, teamId } = bodySchema.parse(request.body);

    const verifyUser = await prisma.teamMember.findFirst({
        where: {
            userId,
            teamId
        }
    })

    if(verifyUser){
        throw new AppError("User is already registered",400)
    }

    const save = await prisma.teamMember.create({
      data: {
        userId,
        teamId,
      },
    });

    return response.status(201).json({ save });
  }

  async findAllMembersTeam(request: Request, response: Response) {
    const list = await prisma.teamMember.findMany({
      include: {
        team: true,
        user: true,
      },
    });


    const teamMap: any = {};

    list.forEach((member) => {
      const { password, ...userWithoutPassword } = member.user;
      
      if (!teamMap[member.teamId]) {
        teamMap[member.teamId] = {
          id: member.team.id,
          name: member.team.name,
          description: member.team.description,
          createdAt: member.team.createdAt,
          updatedAt: member.team.updatedAt,
          users: []
        };
      }

      teamMap[member.teamId].users.push({
        membershipId: member.id,
        ...userWithoutPassword
      });
    });

    return response.json(Object.values(teamMap));
  }
}

export { TeamMembersController };
