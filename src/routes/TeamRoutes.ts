import { Router } from "express"
import { TeamController } from "@/controllers/TeamController"
import { ensureAuthenticated } from "@/middlewares/EnsureAuthenticated"
import { verifyUserPermission } from "@/middlewares/VerifyUserPermission"

const teamRoutes = Router()
const teamController = new TeamController()

teamRoutes.post("/", ensureAuthenticated, verifyUserPermission(["ADMIN"]), teamController.create)
teamRoutes.get("/", ensureAuthenticated, verifyUserPermission(["ADMIN", "MEMBER"]), teamController.findAll)

export {teamRoutes}