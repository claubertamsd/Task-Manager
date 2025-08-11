import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import {Response,Request, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface TokenPayload {
    role: string, 
    subject: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new AppError("JWT Token not found", 401)
        }

        const[, token] = authHeader.split(" ")

        const { role, subject: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload

        request.user = {
            id: user_id,
            role
        }

        return next()
    } catch (error) {
        throw new AppError("Invalid JWT TOKEN", 401)
    }
}

export { ensureAuthenticated}