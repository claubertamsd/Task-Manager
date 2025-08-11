import { Request, Response} from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TeamController {

    async create (request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().min(2),
            description: z.string().optional()
        })

        const {name, description} = bodySchema.parse(request.body)

        await prisma.team.create({data:{
            name, 
            description
        } })

      return  response.status(200).json()
    }

    async findAll (request: Request, response:Response){
      const teamList =  await prisma.team.findMany()
        
      return response.status(200).json({teamList})
    }
}

export {TeamController}