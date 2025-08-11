import { Response, Request } from "express";
import { prisma } from "@/database/prisma";
import {z} from "zod"

class TaskController {
    async createTask(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string().min(3),
            description: z.string(),
            assignedTo: z.number(),
            teamId: z.number(),
           
        })

        const { title, description, assignedTo, teamId } = bodySchema.parse(request.body);
        await prisma.task.create({
            data: {
                title,
                description,
                assignedTo: { connect: { id: assignedTo } },
                team: { connect: { id: teamId } }
            }
        });
        return response.status(201).json();
    }

    async findAllTasks(_: Request, response: Response) {
        const tasks = await prisma.task.findMany({
            include: {
                team: true,
                assignedTo: { select: { id: true, name: true } }
            }
        });



        return response.json(tasks);
    }
}

export {TaskController}