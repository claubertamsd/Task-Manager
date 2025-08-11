import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";


function verifyUserPermission (role: String[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user){
            throw new AppError("Unauthorized", 401)
        }

        if(!role.includes(request.user.role)){
            throw new AppError("Unauthorized", 401)
        }
        

        next()
    }

}

export {verifyUserPermission}